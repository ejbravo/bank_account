import { NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { MovementDto } from './dto/movement.dto';
import { Movement } from './movement.entity';
// import { MovementRepository } from './movement.repository';

export class MovementsService {
  constructor(
    @InjectRepository(Movement)
    private movementRepository: Repository<Movement>,
  ) {}

  public async getMovements(): Promise<Movement[]> {
    const result = await this.movementRepository.find();
    console.log(result);

    if (!result) {
      throw new NotFoundException('None movement');
    }

    return result;
  }

  // private movements: Movement[] = [];
  // public getMovements(): Promise<Movement[]> {
  //   return Promise.resolve(this.movements);
  // }
  // public income(movementDto: MovementDto): Promise<Movement> {
  //   const { amount } = movementDto;
  //   const movement: Movement = {
  //     id: uuid(),
  //     amount,
  //     date: Date.now(),
  //     type: MovementType.INCOME,
  //     balance: 0 + amount,
  //   };
  //   this.movements = [...this.movements, movement];
  //   return Promise.resolve(movement);
  // }
  // public withdraw(movementDto: MovementDto): Promise<Movement> {
  //   const { amount } = movementDto;
  //   const movement: Movement = {
  //     id: uuid(),
  //     amount,
  //     date: Date.now(),
  //     type: MovementType.WITHDRAW,
  //     balance: 0 - amount,
  //   };
  //   this.movements = [...this.movements, movement];
  //   return Promise.resolve(movement);
  // }
}
