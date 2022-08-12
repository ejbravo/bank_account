import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { MovementRepository } from './movement.repository';
import { MovementsController } from './movements.controller';
import { MovementsService } from './movements.service';

@Module({
  imports: [TypeOrmModule.forFeature([MovementRepository])],
  controllers: [MovementsController],
  providers: [MovementsService],
})
export class MovementsModule {}
