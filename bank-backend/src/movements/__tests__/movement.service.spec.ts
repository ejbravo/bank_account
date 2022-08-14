import { Test } from '@nestjs/testing';
import { getRepositoryToken, TypeOrmModule } from '@nestjs/typeorm';
import { User } from '../../auth/user.entity';
import { Repository } from 'typeorm';
import { MovementDto } from '../dto/movement.dto';
import { Movement } from '../movement.entity';
import { MovementsService } from '../movements.service';
import { MovementType } from '../types';

const mockUser: User = {
  id: '1234',
  cardId: '1234567812345678',
  pin: '1234',
  balance: 0,
  movements: [],
};

const getMockMovement = (amount: number, type: MovementType): Movement => ({
  id: '1234',
  amount,
  balance: 0,
  date: Date.now().toString(),
  type,
  user: mockUser,
});

describe('Movement service test suite', () => {
  let movementsService: MovementsService;
  let repository: Repository<Movement>;

  beforeEach(async () => {
    // initialize a NestJS module
    const module = await Test.createTestingModule({
      providers: [
        MovementsService,
        {
          provide: getRepositoryToken(Movement),
          useClass: Repository,
        },
      ],
    }).compile();

    movementsService = module.get(MovementsService);
    repository = module.get<Repository<Movement>>(getRepositoryToken(Movement));
    // repository = module.get(Movement);
  });

  describe('Get all movements', () => {
    test('Should retrieve the complete list of movements', async () => {
      jest.spyOn(repository, 'find').mockResolvedValue([]);
      const result = await movementsService.getMovements();
      expect(result).toBeTruthy();
    });
  });

  describe('Income tests', () => {
    test('Retrieves the created movement', async () => {
      const amount = 100;
      const mockMovementDto: MovementDto = { amount };
      const mockMovement = getMockMovement(amount, MovementType.INCOME);

      jest.spyOn(repository, 'create').mockReturnValue(mockMovement);
      jest.spyOn(repository, 'save').mockResolvedValue(mockMovement);

      const result = await movementsService.income(mockMovementDto);
      expect(result).toHaveProperty('amount');
      expect(result).toHaveProperty('type');
      expect(result.amount).toBe(amount);
      expect(result.type).toBe(MovementType.INCOME);
      expect(repository.create).toHaveBeenCalled();
      expect(repository.save).toBeCalledTimes(1);
    });
  });

  describe('Withdraw tests', () => {
    test('Retrieves the created movement', async () => {
      const amount = 100;
      const mockMovementDto: MovementDto = { amount };
      const mockMovement = getMockMovement(amount, MovementType.WITHDRAW);

      jest.spyOn(repository, 'create').mockReturnValue(mockMovement);
      jest.spyOn(repository, 'save').mockResolvedValue(mockMovement);

      const result = await movementsService.withdraw(mockMovementDto);
      expect(result).toHaveProperty('amount');
      expect(result).toHaveProperty('type');
      expect(result.amount).toBe(amount);
      expect(result.type).toBe(MovementType.WITHDRAW);
      expect(repository.create).toHaveBeenCalled();
      expect(repository.save).toBeCalledTimes(1);
    });
  });
});
