import { Test } from '@nestjs/testing';
import { MovementDto } from '../dto/movement.dto';
import { Movement } from '../movement.entity';
import { MovementsController } from '../movements.controller';
import { MovementsService } from '../movements.service';
import { MovementType } from '../types';

describe('Movement service test suite', () => {
  let movementsController: MovementsController;
  let movementsService: MovementsService;

  beforeEach(async () => {
    // initialize a NestJS module
    const module = await Test.createTestingModule({
      controllers: [MovementsController],
      providers: [MovementsService],
    }).compile();

    movementsService = module.get(MovementsService);
    movementsController = module.get(MovementsController);
  });

  describe('Get all movements', () => {
    test('Should retrieve the complete list of movements', async () => {
      const mockResult: Movement[] = [
        {
          id: '1',
          amount: 100,
          balance: 100,
          date: Date.now(),
          type: MovementType.INCOME,
        },
      ];

      jest
        .spyOn(movementsService, 'getMovements')
        .mockImplementation(async () => mockResult);

      expect(await movementsController.list()).toBe(mockResult);
    });
  });

  describe('Income tests', () => {
    test('Retrieves the created movement', async () => {
      const mockMovementDto: MovementDto = {
        amount: 500,
      };
      const { amount } = mockMovementDto;

      const mockResult: Movement = {
        id: '1',
        amount,
        balance: 100,
        date: Date.now(),
        type: MovementType.INCOME,
      };

      jest
        .spyOn(movementsService, 'income')
        .mockImplementation(async () => mockResult);

      const result = await movementsController.income(mockMovementDto);
      expect(result).toHaveProperty('amount');
      expect(result).toHaveProperty('type');
      expect(result.amount).toBe(amount);
      expect(result.type).toBe(MovementType.INCOME);
    });
  });

  describe('Withdraw tests', () => {
    test('Retrieves the created movement', async () => {
      const mockMovementDto: MovementDto = {
        amount: 500,
      };
      const { amount } = mockMovementDto;

      const mockResult: Movement = {
        id: '1',
        amount,
        balance: 100,
        date: Date.now(),
        type: MovementType.WITHDRAW,
      };

      jest
        .spyOn(movementsService, 'withdraw')
        .mockImplementation(async () => mockResult);

      const result = await movementsController.withdraw(mockMovementDto);
      expect(result).toHaveProperty('amount');
      expect(result).toHaveProperty('type');
      expect(result.amount).toBe(amount);
      expect(result.type).toBe(MovementType.WITHDRAW);
    });
  });
});
