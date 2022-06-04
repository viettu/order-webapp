import { Logger } from '@nestjs/common';
import { NestFactory } from '@nestjs/core';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import { AppModule } from './app.module';
import getLogLevels from './share/utilities';

async function bootstrap() {
  const app = await NestFactory.create(AppModule, {
    logger: getLogLevels(process.env.NODE_ENV === 'production')
  });

  // Swagger setup
  const config = new DocumentBuilder()
    .setTitle('Orders api')
    .setDescription('API for orders')
    .setVersion('1.0')
    .addTag('orders-api')
    .build();
  const document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('/orders-api', app, document);

  const PORT = 8001;
  await app.listen(PORT, () => {
    const logger = new Logger('App bootstrap');
    logger.log(`Orders microservice is listening on port ${PORT}`);
  });
}
bootstrap();
