import { MovementDto } from './dto/movement.dto';
import { Movement, MovementType } from './movement.entity';
import { v4 as uuid } from 'uuid';

export class MovementsService {
  private movements: Movement[] = [];

  public getMovements(): Promise<Movement[]> {
    return Promise.resolve(this.movements);
  }

  public income(movementDto: MovementDto): Promise<Movement> {
    const { amount } = movementDto;

    const movement: Movement = {
      id: uuid(),
      amount,
      date: Date.now(),
      type: MovementType.INCOME,
      balance: 0 + amount,
    };

    this.movements = [...this.movements, movement];

    return Promise.resolve(movement);
  }

  public withdraw(movementDto: MovementDto): Promise<Movement> {
    const { amount } = movementDto;

    const movement: Movement = {
      id: uuid(),
      amount,
      date: Date.now(),
      type: MovementType.WITHDRAW,
      balance: 0 - amount,
    };

    this.movements = [...this.movements, movement];

    return Promise.resolve(movement);
  }
}
