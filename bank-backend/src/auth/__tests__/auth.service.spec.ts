import { Test, TestingModule } from '@nestjs/testing';
import { getRepositoryToken } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { AuthService } from '../auth.service';
import { AuthDto } from '../dto/auth.dto';
import { User } from '../user.entity';
import * as bcrypt from 'bcrypt';
import { JwtService } from '@nestjs/jwt';
import {
  InternalServerErrorException,
  Logger,
  UnauthorizedException,
} from '@nestjs/common';

describe('AuthService suite test', () => {
  const mockCardId = '1234567812345678';
  const mockPin = '1234';

  const mockUser: User = {
    id: '1234',
    cardId: mockCardId,
    pin: mockPin,
    account: 0,
    movements: [],
  };

  let authService: AuthService;
  let jwtService: JwtService;
  let repository: Repository<User>;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        AuthService,
        {
          provide: getRepositoryToken(User),
          useClass: Repository,
        },
        {
          provide: JwtService,
          useValue: {
            sign: jest.fn(),
          },
        },
      ],
    }).compile();

    authService = module.get<AuthService>(AuthService);
    jwtService = module.get(JwtService);
    repository = module.get<Repository<User>>(getRepositoryToken(User));
  });

  it('should be defined', () => {
    expect(authService).toBeDefined();
  });

  describe('About method "createUser"', () => {
    it('Should create an user in db if credentials are ok', async () => {
      const mockAuthDto: AuthDto = {
        cardId: mockCardId,
        pin: mockPin,
      };

      jest.spyOn(repository, 'create').mockReturnValue(mockUser);
      jest.spyOn(repository, 'save').mockResolvedValue(mockUser);

      await authService.createUser(mockAuthDto);

      expect(repository.create).toHaveBeenCalled();
      expect(repository.save).toBeCalledTimes(1);
    });

    it('Should throw an error if credentials are not ok', async () => {
      const mockAuthDto: AuthDto = {
        cardId: 'wrongCardId',
        pin: mockPin,
      };

      jest.spyOn(repository, 'create').mockReturnValue(mockUser);
      jest
        .spyOn(repository, 'save')
        .mockRejectedValue(new InternalServerErrorException());

      try {
        await authService.createUser(mockAuthDto);
      } catch (error) {
        expect(error).toBeInstanceOf(InternalServerErrorException);
        expect(error.message).toBe('Internal Server Error');
      }
    });
  });

  describe('About method "getUser"', () => {
    it('Should get the user from the db if credentials are ok', async () => {
      const mockAuthDto: AuthDto = {
        cardId: mockCardId,
        pin: mockPin,
      };

      jest.spyOn(repository, 'findOneBy').mockResolvedValue(mockUser);

      const bcryptCompare = jest.fn().mockResolvedValue(true);
      (bcrypt.compare as jest.Mock) = bcryptCompare;

      jest.spyOn(jwtService, 'sign').mockReturnValue('whatever');

      const result = await authService.getUser(mockAuthDto);

      expect(repository.findOneBy).toHaveBeenCalled();
      expect(result).toEqual({ accessToken: 'whatever' });
    });

    it('Should throw Unauthorized exception if user is not found', async () => {
      const mockAuthDto: AuthDto = {
        cardId: 'wrongCardId',
        pin: mockPin,
      };

      jest
        .spyOn(repository, 'findOneBy')
        .mockRejectedValue(new UnauthorizedException());

      try {
        const result = await authService.getUser(mockAuthDto);
      } catch (error) {
        expect(error).toBeInstanceOf(UnauthorizedException);
        expect(error.message).toBe('Unauthorized');
      }
    });

    it('Should throw Unauthorized exception if PIN is wrong', async () => {
      const mockAuthDto: AuthDto = {
        cardId: mockCardId,
        pin: 'wrongPin',
      };

      jest.spyOn(repository, 'findOneBy').mockResolvedValue(mockUser);

      const bcryptCompare = jest
        .fn()
        .mockResolvedValue(new UnauthorizedException());
      (bcrypt.compare as jest.Mock) = bcryptCompare;

      try {
        const result = await authService.getUser(mockAuthDto);
      } catch (error) {
        expect(error).toBeInstanceOf(UnauthorizedException);
        expect(error.message).toBe('Unauthorized');
      }
    });
  });
});
