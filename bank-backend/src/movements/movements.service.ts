import { NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { MovementDto } from './dto/movement.dto';
import { Movement } from './movement.entity';
import { MovementType } from './types';

export class MovementsService {
  constructor(
    @InjectRepository(Movement)
    private repository: Repository<Movement>,
  ) {}

  public async getMovements(): Promise<Movement[]> {
    console.log(this.repository);
    const result = await this.repository.find();

    if (!result) {
      throw new NotFoundException('None movement');
    }

    return result;
  }

  public async income(movementDto: MovementDto): Promise<Movement> {
    const { amount } = movementDto;

    const movement = this.repository.create({
      amount,
      balance: 0 + amount,
      date: Date.now().toString(),
      type: MovementType.INCOME,
    });

    await this.repository.save(movement);

    return movement;
  }

  public async withdraw(movementDto: MovementDto): Promise<Movement> {
    const { amount } = movementDto;

    const movement = this.repository.create({
      amount,
      balance: 0 - amount,
      date: Date.now().toString(),
      type: MovementType.WITHDRAW,
    });

    await this.repository.save(movement);

    return movement;
  }
}
