import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';

async function bootstrap() {
  const port = process.env.PORT ? parseInt(process.env.PORT) : 3001;
  console.log(port);
  const app = await NestFactory.create(AppModule);
  await app.listen(port);
}
bootstrap();
