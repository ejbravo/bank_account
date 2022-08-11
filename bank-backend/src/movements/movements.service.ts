import { MovementDto } from './dto/movement.dto';
import { Movement, MovementType } from './movement.entity';

export class MovementsService {
  public getMovements(): Promise<Movement[]> {
    const movement: Movement = {
      id: '1234',
      amount: 100,
      date: Date.now(),
      type: MovementType.INCOME,
      balance: 100,
    };

    return Promise.resolve([movement]);
  }

  public income(movementDto: MovementDto): Promise<Movement> {
    const { amount } = movementDto;

    const movement: Movement = {
      id: '1234',
      amount,
      date: Date.now(),
      type: MovementType.INCOME,
      balance: 0,
    };

    return Promise.resolve(movement);
  }
}
