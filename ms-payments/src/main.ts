import { Logger } from '@nestjs/common';
import { NestFactory } from '@nestjs/core';
import { MicroserviceOptions, Transport } from '@nestjs/microservices';
import { AppModule } from './app.module';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  if (process.env.NODE_ENV !== 'production') {
    const logger = new Logger();
    logger.log(`Connecting to QUEUE ${process.env.RABBITMQ_URL} - ${process.env.RABBITMQ_QUEUE}`);
  }

  app.connectMicroservice<MicroserviceOptions>({
    transport: Transport.RMQ,
    options: {
      urls: [process.env.RABBITMQ_URL],
      queue: process.env.RABBITMQ_QUEUE,
      queueOptions: {
        durable: true,
      },
    },
  });

  app.startAllMicroservices();
}
bootstrap();
