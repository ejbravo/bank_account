import { Test } from '@nestjs/testing';
import { MovementDto } from '../dto/movement.dto';
import { MovementType } from '../movement.entity';
import { MovementsService } from '../movements.service';

describe('Movement service test suite', () => {
  let movementsService: MovementsService;

  beforeEach(async () => {
    // initialize a NestJS module
    const module = await Test.createTestingModule({
      providers: [MovementsService],
    }).compile();

    movementsService = module.get(MovementsService);
  });

  describe('Get all movements', () => {
    test('Should retrieve the complete list of movements', async () => {
      const result = await movementsService.getMovements();
      expect(result).toBeTruthy();
    });
  });

  describe('Income tests', () => {
    test('Retrieves the created movement', async () => {
      const mockMovementDto: MovementDto = {
        amount: '500',
      };

      const { amount: amountString } = mockMovementDto;
      const amount = parseInt(amountString);
      //   const mockMovement: Movement = {
      //     id: '1234',
      //     amount,
      //     balance: 0,
      //     date: Date.now(),
      //     type: MovementType.INCOME,
      //   };

      const result = await movementsService.income(mockMovementDto);
      expect(result).toHaveProperty('amount');
      expect(result).toHaveProperty('type');
      expect(result.amount).toBe(amount);
      expect(result.type).toBe(MovementType.INCOME);
    });
  });

  describe('Withdraw tests', () => {
    test('Retrieves the created movement', async () => {
      const mockMovementDto: MovementDto = {
        amount: '500',
      };

      const { amount: amountString } = mockMovementDto;
      const amount = parseInt(amountString);
      //   const mockMovement: Movement = {
      //     id: '1234',
      //     amount,
      //     balance: 0,
      //     date: Date.now(),
      //     type: MovementType.INCOME,
      //   };

      const result = await movementsService.withdraw(mockMovementDto);
      expect(result).toHaveProperty('amount');
      expect(result).toHaveProperty('type');
      expect(result.amount).toBe(amount);
      expect(result.type).toBe(MovementType.WITHDRAW);
    });
  });
});
