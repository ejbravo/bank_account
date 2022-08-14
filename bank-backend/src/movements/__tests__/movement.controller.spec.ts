import { Test, TestingModule } from '@nestjs/testing';
import { getRepositoryToken } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Movement } from '../movement.entity';
import { MovementsController } from '../movements.controller';
import { MovementsService } from '../movements.service';

describe('MovementController', () => {
  let controller: MovementsController;
  let service: MovementsService;
  let repository: Repository<Movement>;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        MovementsService,
        {
          provide: getRepositoryToken(Movement),
          useClass: Repository,
        },
      ],
      controllers: [MovementsController],
    }).compile();

    controller = module.get<MovementsController>(MovementsController);
    service = module.get<MovementsService>(MovementsService);
    repository = module.get<Repository<Movement>>(getRepositoryToken(Movement));
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
