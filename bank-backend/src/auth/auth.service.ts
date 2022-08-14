import { Injectable } from '@nestjs/common';
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

    const user = this.repository.create({ cardId, pin });
    await this.repository.save(user);
  }
}
