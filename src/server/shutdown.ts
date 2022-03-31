import { Server } from 'http';

import { Logger } from '../logger';

const logger = Logger("graceful-shutdown");

const shutdownGracefully = (server: Server, options = { coredump: false, timeout: 500 }) => {
  // Exit function
	const closeHttpServer = (code: unknown) => {
    logger.info('Todas as requisições HTTP encerradas. Encerrando servidor...');
		options.coredump ? process.abort() : process.exit(code as number);
	}

	// Returning exit handler function, receiving
	// the code and signal as arguments.
  return (code: number, reason: string) => (err: Error | unknown, promise: Promise<unknown>) => {
		if (err && err instanceof Error) {
			// Log error information, use a proper logging library here :)
			logger.error(`Encerrando em função de erro com mensagem: ${err.message}`);
		}

		// Attempt a graceful shutdown
		logger.info(`Parando o servidor HTTP para o sinal "${reason}" com código ${code}`);
		server.close(closeHttpServer);
		setTimeout(closeHttpServer, options.timeout).unref();
	}
};

export { shutdownGracefully };
