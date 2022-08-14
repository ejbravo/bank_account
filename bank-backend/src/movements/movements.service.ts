import { NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from '../auth/user.entity';
import { Repository } from 'typeorm';
import { MovementDto } from './dto/movement.dto';
import { Movement } from './movement.entity';
import { MovementType } from './types';

export class MovementsService {
  constructor(
    @InjectRepository(Movement)
    private repository: Repository<Movement>,
  ) {}

  public async getMovements(user: User): Promise<Movement[]> {
    const result = await this.repository.findBy({ user });

    if (!result) {
      throw new NotFoundException('None movement');
    }

    return result;
  }

  public async income(movementDto: MovementDto, user: User): Promise<Movement> {
    const { amount } = movementDto;

    const movement = this.repository.create({
      amount,
      balance: 0 + amount,
      date: Date.now().toString(),
      type: MovementType.INCOME,
      user,
    });

    await this.repository.save(movement);

    return movement;
  }

  public async withdraw(
    movementDto: MovementDto,
    user: User,
  ): Promise<Movement> {
    const { amount } = movementDto;

    const movement = this.repository.create({
      amount,
      balance: 0 - amount,
      date: Date.now().toString(),
      type: MovementType.WITHDRAW,
      user,
    });

    await this.repository.save(movement);

    return movement;
  }
}
