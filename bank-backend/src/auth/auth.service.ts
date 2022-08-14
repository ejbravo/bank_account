import {
  ConflictException,
  Injectable,
  InternalServerErrorException,
  UnauthorizedException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { AuthDto } from './dto/auth.dto';
import { User } from './user.entity';
import * as bcrypt from 'bcrypt';

@Injectable()
export class AuthService {
  constructor(
    @InjectRepository(User)
    private repository: Repository<User>,
  ) {}

  public async createUser(authDto: AuthDto): Promise<void> {
    const { cardId, pin } = authDto;

    // including hash to PIN
    const salt = await bcrypt.genSalt();
    const hashedPin = await bcrypt.hash(pin, salt);

    const user = this.repository.create({
      cardId,
      pin: hashedPin,
      balance: 0,
    });

    try {
      await this.repository.save(user);
    } catch (error) {
      const { code } = error;

      // duplicated cardId error
      if (code === '23505') {
        throw new ConflictException('CardId already exists');
      } else {
        throw new InternalServerErrorException();
      }
    }
  }

  public async getUser(authDto: AuthDto): Promise<string> {
    const { cardId, pin } = authDto;

    const user = await this.repository.findOneBy({ cardId });
    if (!user) throw new UnauthorizedException('Please, check your cardId');

    const isPinMatch = await bcrypt.compare(pin, user.pin);
    if (!isPinMatch)
      throw new UnauthorizedException('Please, check your credentials');

    return 'success';
  }
}
