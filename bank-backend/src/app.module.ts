import { ConfigModule } from '@nestjs/config';
import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { MovementsModule } from './movements/movements.module';

@Module({
  imports: [ConfigModule.forRoot(), MovementsModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
