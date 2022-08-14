import { ValidationPipe } from '@nestjs/common';
import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { TransformInterceptor } from './transform.interceptor';

async function bootstrap() {
  const port = process.env.PORT ? parseInt(process.env.PORT) : 3001;

  const app = await NestFactory.create(AppModule);
  app.useGlobalPipes(new ValidationPipe()); // Validation
  app.useGlobalInterceptors(new TransformInterceptor()); // Removing User from Movement responses
  await app.listen(port);
}
bootstrap();
