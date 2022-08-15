import { ValidationPipe, Logger } from '@nestjs/common';
import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { TransformInterceptor } from './transform.interceptor';

async function bootstrap() {
  const port = process.env.PORT ? parseInt(process.env.PORT) : 3001;

  const logger = new Logger('Main');
  const app = await NestFactory.create(AppModule);

  app.enableCors();
  app.useGlobalPipes(new ValidationPipe()); // Validation
  app.useGlobalInterceptors(new TransformInterceptor()); // Removing User from Movement responses

  await app.listen(port);
  logger.log(`Application is listening on port ${port}`);
}
bootstrap();
