import { NestFactory } from '@nestjs/core';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import { AppModule } from './app.module';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  const config = new DocumentBuilder()
    .setTitle('Orders api')
    .setDescription('The cats API description')
    .setVersion('1.0')
    .addTag('orders-api')
    .build();
  const document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('/orders-api', app, document);

  const PORT = 8001;
  await app.listen(PORT, () => {
    console.log(`Orders microservice is listening on port ${PORT}`);
  });
}
bootstrap();
