import build from './app';


async function main() {

  const server = await build({
    logger: {
      level: 'info',
      transport: {
        target: 'pino-pretty',
      },
    },
  });

  try {
    await server.listen({
      port: server.config.PORT,
    });
  } catch (err) {
    server.log.error(err);
    process.exit(1);
  }

}

void main();

