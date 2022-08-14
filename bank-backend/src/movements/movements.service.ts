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
    private movementRepository: Repository<Movement>,
    @InjectRepository(User)
    private userRepository: Repository<User>,
  ) {}

  public async getMovements(user: User): Promise<Movement[]> {
    const result = await this.movementRepository.findBy({ user });

    if (!result) {
      throw new NotFoundException('None movement');
    }

    return result;
  }

  public async income(movementDto: MovementDto, user: User): Promise<Movement> {
    const { amount } = movementDto;
    const { id, account } = user;
    const balance = account + amount;

    const movement = this.movementRepository.create({
      amount,
      balance,
      date: Date.now().toString(),
      type: MovementType.INCOME,
      user,
    });

    await this.movementRepository.save(movement);
    await this.userRepository.update({ id }, { account: balance });

    return movement;
  }

  public async withdraw(
    movementDto: MovementDto,
    user: User,
  ): Promise<Movement> {
    const { amount } = movementDto;
    const { id, account } = user;
    const balance = account - amount;

    const movement = this.movementRepository.create({
      amount,
      balance,
      date: Date.now().toString(),
      type: MovementType.WITHDRAW,
      user,
    });

    await this.movementRepository.save(movement);
    await this.userRepository.update({ id }, { account: balance });

    return movement;
  }
}
