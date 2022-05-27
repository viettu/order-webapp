import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  
  const PORT = 8001;
  await app.listen(PORT, () => {
    console.log(`Orders microservice is listening on port ${PORT}`);
  });
}
bootstrap();
