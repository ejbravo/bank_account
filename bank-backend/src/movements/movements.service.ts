import {
  InternalServerErrorException,
  Logger,
  NotFoundException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from '../auth/user.entity';
import { Repository } from 'typeorm';
import { MovementDto } from './dto/movement.dto';
import { Movement } from './movement.entity';
import { MovementType } from './types';
import { trimCardId } from '../utils';

export class MovementsService {
  private logger = new Logger('MovementsService');

  constructor(
    @InjectRepository(Movement)
    private movementRepository: Repository<Movement>,
    @InjectRepository(User)
    private userRepository: Repository<User>,
  ) {}

  public async getMovements(user: User): Promise<Movement[]> {
    const trimmedCardId = trimCardId(user.cardId);

    try {
      const result = await this.movementRepository.findBy({ user });

      this.logger.verbose(
        `User "${trimmedCardId}": #${result.length} movements found`,
      );

      return result;
    } catch (error) {
      this.logger.error(
        `User "${trimmedCardId}": Impossible to find account movements`,
      );
      throw new NotFoundException();
    }
  }

  public async income(movementDto: MovementDto, user: User): Promise<Movement> {
    const { amount } = movementDto;
    const { id, account } = user;
    const balance = account + amount;
    const trimmedCardId = trimCardId(user.cardId);

    try {
      const movement = this.movementRepository.create({
        amount,
        balance,
        date: Date.now().toString(),
        type: MovementType.INCOME,
        user,
      });

      await this.movementRepository.save(movement);
      await this.userRepository.update({ id }, { account: balance });

      this.logger.verbose(`User "${trimmedCardId}" INCOME done`);

      return movement;
    } catch (error) {
      this.logger.error(`User "${trimmedCardId}": INCOME failed`);
      throw new InternalServerErrorException();
    }
  }

  public async withdraw(
    movementDto: MovementDto,
    user: User,
  ): Promise<Movement> {
    const { amount } = movementDto;
    const { id, account } = user;
    const balance = account - amount;
    const trimmedCardId = trimCardId(user.cardId);

    try {
      const movement = this.movementRepository.create({
        amount,
        balance,
        date: Date.now().toString(),
        type: MovementType.WITHDRAW,
        user,
      });

      await this.movementRepository.save(movement);
      await this.userRepository.update({ id }, { account: balance });

      this.logger.verbose(`User "${trimmedCardId}" WITHDRAW done`);

      return movement;
    } catch (error) {
      this.logger.error(`User "${trimmedCardId}": WITHDRAW failed`);
      throw new InternalServerErrorException();
    }
  }
}
