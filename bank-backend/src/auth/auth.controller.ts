import { Body, Controller, Logger, Post } from '@nestjs/common';
import { trimCardId } from '../utils';
import { AuthService } from './auth.service';
import { AuthDto } from './dto/auth.dto';
import { AccessToken } from './types';

@Controller('auth')
export class AuthController {
  private logger = new Logger('AuthController');

  constructor(private authService: AuthService) {}

  @Post('/signup')
  public signUp(@Body() authDto: AuthDto): Promise<void> {
    const { cardId } = authDto;
    const trimmedCardId = trimCardId(cardId);
    this.logger.verbose(`User "${trimmedCardId}" signed up`);

    return this.authService.createUser(authDto);
  }

  @Post('/signin')
  public signIn(@Body() authDto: AuthDto): Promise<AccessToken> {
    const { cardId } = authDto;
    const trimmedCardId = trimCardId(cardId);
    this.logger.verbose(`User "${trimmedCardId}" signed in`);

    return this.authService.getUser(authDto);
  }
}
