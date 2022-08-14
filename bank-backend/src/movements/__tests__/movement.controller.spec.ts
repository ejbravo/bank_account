import { Test, TestingModule } from '@nestjs/testing';
import { getRepositoryToken } from '@nestjs/typeorm';
import { User } from '../../auth/user.entity';
import { Repository } from 'typeorm';
import { Movement } from '../movement.entity';
import { MovementsController } from '../movements.controller';
import { MovementsService } from '../movements.service';

describe('MovementController', () => {
  let controller: MovementsController;
  let service: MovementsService;
  let movementRepository: Repository<Movement>;
  let userRepository: Repository<User>;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
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
      controllers: [MovementsController],
    }).compile();

    controller = module.get<MovementsController>(MovementsController);
    service = module.get<MovementsService>(MovementsService);
    movementRepository = module.get<Repository<Movement>>(
      getRepositoryToken(Movement),
    );
    userRepository = module.get<Repository<User>>(getRepositoryToken(User));
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
