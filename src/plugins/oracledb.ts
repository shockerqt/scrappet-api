import { FastifyInstance, FastifyPluginAsync } from 'fastify';
import OracleDB, { createPool, getConnection, getPool } from 'oracledb';
import fastifyPlugin from 'fastify-plugin';

declare module 'fastify' {
  interface FastifyInstance {
    db: (callback: (connection: OracleDB.Connection) => Promise<void>) => Promise<void>;
  }
}

interface OraclePluginOptions {
  user: string;
  password: string;
  connectString: string;
}

// Create the plugin
export const oracle: FastifyPluginAsync<OraclePluginOptions> = async (fastify, options) => {
  try {
    await createPool({
      user: options.user,
      password: options.password,
      connectString: options.connectString,
    });
  } catch (error) {
    console.error(error);
    throw error;
  }

  fastify.decorate('db', async (callback: (connection: OracleDB.Connection) => Promise<void>) => {
    let connection: OracleDB.Connection | undefined;
    try {
      connection = await getConnection();
      await callback(connection);
    } catch (error) {
      console.error(error);
    } finally {
      if (connection) await connection?.close();
    }
  });

  fastify.addHook('onClose', async () => {
    console.log('Closing db connection');
    await getPool().close(5);
    console.log('DB CONNECTION closed');
  });

};

// Register the plugin
const registerDb = async (fastify: FastifyInstance) => {
  await fastify.register(fastifyPlugin(oracle), {
    user: fastify.config.ORACLEDB_USER,
    password: fastify.config.ORACLEDB_PASSWORD,
    connectString: fastify.config.ORACLEDB_CONN_STRING,
  });
};

export default registerDb;
