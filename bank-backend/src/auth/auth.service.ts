import {
  ConflictException,
  Injectable,
  InternalServerErrorException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { AuthDto } from './dto/auth.dto';
import { User } from './user.entity';

@Injectable()
export class AuthService {
  constructor(
    @InjectRepository(User)
    private repository: Repository<User>,
  ) {}

  public async createUser(authDto: AuthDto): Promise<void> {
    const { cardId, pin } = authDto;

    const user = this.repository.create({ cardId, pin, balance: 0 });

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
}
