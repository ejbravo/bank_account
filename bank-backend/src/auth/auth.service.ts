import {
  ConflictException,
  Injectable,
  InternalServerErrorException,
  Logger,
  UnauthorizedException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { AuthDto } from './dto/auth.dto';
import { User } from './user.entity';
import * as bcrypt from 'bcrypt';
import { JwtService } from '@nestjs/jwt';
import { AccessToken, JwtPayload } from './types';
import { trimCardId } from '../utils';

@Injectable()
export class AuthService {
  private logger = new Logger('AuthService');

  constructor(
    @InjectRepository(User)
    private repository: Repository<User>,
    private jwtService: JwtService,
  ) {}

  public async createUser(authDto: AuthDto): Promise<void> {
    const { cardId, pin } = authDto;
    const trimmedCardId = trimCardId(cardId);

    // including hash to PIN
    const salt = await bcrypt.genSalt();
    const hashedPin = await bcrypt.hash(pin, salt);

    try {
      const user = this.repository.create({
        cardId,
        pin: hashedPin,
        account: 0,
      });

      await this.repository.save(user);

      this.logger.verbose(`User "${trimmedCardId}" created`);
    } catch (error) {
      const { code } = error;

      // duplicated cardId error
      if (code === '23505') {
        this.logger.warn(`User "${trimmedCardId}" already exists`);
        throw new ConflictException('CardId already exists');
      } else {
        this.logger.error(`User "${trimmedCardId}" could not be created`);
        throw new InternalServerErrorException();
      }
    }
  }

  public async getUser(authDto: AuthDto): Promise<AccessToken> {
    const { cardId, pin } = authDto;
    const trimmedCardId = trimCardId(cardId);

    const user = await this.repository.findOneBy({ cardId });
    if (!user) {
      this.logger.verbose(`User "${trimmedCardId}" was not found`);
      throw new UnauthorizedException('Please, check your cardId');
    }

    const isPinMatch = await bcrypt.compare(pin, user.pin);
    if (!isPinMatch) {
      this.logger.verbose(`User "${trimmedCardId}" wrong credentials (PIN)`);
      throw new UnauthorizedException('Please, check your credentials');
    }

    const payload: JwtPayload = { cardId };
    const accessToken = this.jwtService.sign(payload);

    this.logger.verbose(`User "${trimmedCardId}" Signed in`);

    return { accessToken };
  }
}
