import { Test } from '@nestjs/testing';
import { getRepositoryToken } from '@nestjs/typeorm';
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
  account: 0,
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
  let movementRepository: Repository<Movement>;
  let userRepository: Repository<User>;

  beforeEach(async () => {
    // initialize a NestJS module
    const module = await Test.createTestingModule({
      providers: [
        MovementsService,
        {
          provide: getRepositoryToken(Movement),
          useClass: Repository,
        },
        {
          provide: getRepositoryToken(User),
          useClass: Repository,
        },
      ],
    }).compile();

    movementsService = module.get(MovementsService);
    movementRepository = module.get<Repository<Movement>>(
      getRepositoryToken(Movement),
    );
    userRepository = module.get<Repository<User>>(getRepositoryToken(User));
  });

  describe('Get all movements', () => {
    test('Should retrieve the complete list of movements', async () => {
      jest.spyOn(movementRepository, 'findBy').mockResolvedValue([]);
      const result = await movementsService.getMovements(mockUser);
      expect(result).toBeTruthy();
    });
  });

  describe('Income tests', () => {
    test('Retrieves the created movement', async () => {
      const amount = 100;
      const mockMovementDto: MovementDto = { amount };
      const mockMovement = getMockMovement(amount, MovementType.INCOME);

      jest.spyOn(movementRepository, 'create').mockReturnValue(mockMovement);
      jest.spyOn(movementRepository, 'save').mockResolvedValue(mockMovement);
      jest.spyOn(userRepository, 'update').mockResolvedValue({} as any);

      const result = await movementsService.income(mockMovementDto, mockUser);
      expect(result).toHaveProperty('amount');
      expect(result).toHaveProperty('type');
      expect(result.amount).toBe(amount);
      expect(result.type).toBe(MovementType.INCOME);
      expect(movementRepository.create).toHaveBeenCalled();
      expect(movementRepository.save).toBeCalledTimes(1);
    });
  });

  describe('Withdraw tests', () => {
    test('Retrieves the created movement', async () => {
      const amount = 100;
      const mockMovementDto: MovementDto = { amount };
      const mockMovement = getMockMovement(amount, MovementType.WITHDRAW);

      jest.spyOn(movementRepository, 'create').mockReturnValue(mockMovement);
      jest.spyOn(movementRepository, 'save').mockResolvedValue(mockMovement);
      jest.spyOn(userRepository, 'update').mockResolvedValue({} as any);

      const result = await movementsService.withdraw(mockMovementDto, mockUser);
      expect(result).toHaveProperty('amount');
      expect(result).toHaveProperty('type');
      expect(result.amount).toBe(amount);
      expect(result.type).toBe(MovementType.WITHDRAW);
      expect(movementRepository.create).toHaveBeenCalled();
      expect(movementRepository.save).toBeCalledTimes(1);
    });
  });
});
