import fastifyEnv from '@fastify/env';
import { FastifyInstance } from 'fastify';

declare module 'fastify' {
  interface FastifyInstance {
    config: {
      PORT: number;
      ORACLEDB_USER: string;
      ORACLEDB_PASSWORD: string;
      ORACLEDB_CONN_STRING: string;
    };
  }
}

const schema = {
  type: 'object',
  required: [
    'ORACLEDB_USER',
    'ORACLEDB_PASSWORD',
    'ORACLEDB_CONN_STRING',
  ],
  properties: {
    PORT: {
      type: 'number',
      default: 3000,
    },
    ORACLEDB_USER: {
      type: 'string',
    },
    ORACLEDB_PASSWORD: {
      type: 'string',
    },
    ORACLEDB_CONN_STRING: {
      type: 'string',
    },
  },
};

const options = {
  dotenv: true,
  confKey: 'config',
  schema,
  data: process.env,
};

export default async function registerEnv(fastify: FastifyInstance) {
  await fastify.register(fastifyEnv, options);
}
