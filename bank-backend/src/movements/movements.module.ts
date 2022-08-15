import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { User } from '../auth/user.entity';
import { AuthModule } from '../auth/auth.module';

import { Movement } from './movement.entity';

import { MovementsController } from './movements.controller';
import { MovementsService } from './movements.service';

@Module({
  imports: [TypeOrmModule.forFeature([Movement, User]), AuthModule],
  controllers: [MovementsController],
  providers: [MovementsService],
})
export class MovementsModule {}
