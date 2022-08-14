import { Test, TestingModule } from '@nestjs/testing';
import { getRepositoryToken } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { AuthService } from '../auth.service';
import { AuthDto } from '../dto/auth.dto';
import { User } from '../user.entity';

describe('AuthService', () => {
  let authService: AuthService;
  let repository: Repository<User>;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        AuthService,
        {
          provide: getRepositoryToken(User),
          useClass: Repository,
        },
      ],
    }).compile();

    authService = module.get<AuthService>(AuthService);
    repository = module.get<Repository<User>>(getRepositoryToken(User));
  });

  it('should be defined', () => {
    expect(authService).toBeDefined();
  });

  it('Should create an user if everything is ok', async () => {
    const mockCardId = '1234567812345678';
    const mockPin = '1234';

    const mockAuthDto: AuthDto = {
      cardId: mockCardId,
      pin: mockPin,
    };
    const mockUser: User = {
      id: '1234',
      cardId: mockCardId,
      pin: mockPin,
      balance: 0,
    };

    jest.spyOn(repository, 'create').mockReturnValue(mockUser);
    jest.spyOn(repository, 'save').mockResolvedValue(mockUser);

    await authService.createUser(mockAuthDto);

    expect(repository.create).toHaveBeenCalled();
    expect(repository.save).toBeCalledTimes(1);
  });
});
