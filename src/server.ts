import { Server } from 'http';
import mongoose from 'mongoose';
import app from './app';
import config from './config';
// import { errorlogger, logger } from './shared/logger';

async function bootstrap() {
  await mongoose.connect(config.database_url as string);
  console.log('database connection successfull');

  const server: Server = app.listen(config.port, () => {
    console.log(`Server running on port ${config.port}`);
    // logger.info(`Server running on port ${config.port}`);
  });

  const exitHandler = () => {
    if (server) {
      server.close(() => {
        // logger.info('Server closed');
        console.log('Server closed');
      });
    }
    process.exit(1);
  };

  const unexpectedErrorHandler = (error: unknown) => {
    console.log(error);
    exitHandler();
  };

  process.on('uncaughtException', unexpectedErrorHandler);
  process.on('unhandledRejection', unexpectedErrorHandler);

  process.on('SIGTERM', () => {
    // logger.info('SIGTERM received');
    console.log('SIGTERM received');
    if (server) {
      server.close();
    }
  });
}

bootstrap();
