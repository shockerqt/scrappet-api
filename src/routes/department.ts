import { FastifyInstance, FastifyReply, FastifyRequest } from 'fastify';

async function departmentGetHandler(this: FastifyInstance, _request: FastifyRequest, reply: FastifyReply) {
  return await reply.send({ hello: 'department' });
}



export async function departmentRouter(fastify: FastifyInstance) {
  fastify.get('/', departmentGetHandler);
  // fastify.post('/', departmentGetHandler);
  // fastify.patch('/', departmentGetHandler);
  // fastify.delete('/', departmentGetHandler);
}
