import { FastifyInstance } from 'fastify';
import oracleRouter from './oracle.router';
import { departmentRouter } from './department';

export default async function registerRoutes(fastify: FastifyInstance) {
  // await fastify.register(oracleRouter, { prefix: '/api/oracle' });
  void fastify.register(departmentRouter, { prefix: '/api/department' });
}
