import fastify, { FastifyInstance, FastifyServerOptions } from 'fastify';
import registerEnv from './plugins/env';
import registerRoutes from './routes';
import registerDb from './plugins/oracledb';


async function build(options: FastifyServerOptions = {}): Promise<FastifyInstance> {
  const app = fastify(options);

  // await for get env variables on the subsquent plugins
  await registerEnv(app);

  void registerDb(app);
  registerRoutes(app);

  return app;
}

export default build;
