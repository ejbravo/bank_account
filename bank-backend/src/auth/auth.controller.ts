import { Body, Controller, Post } from '@nestjs/common';
import { AuthService } from './auth.service';
import { AuthDto } from './dto/auth.dto';
import { AccessToken } from './types';

@Controller('auth')
export class AuthController {
  constructor(private authService: AuthService) {}

  @Post('/signup')
  public signUp(@Body() authDto: AuthDto): Promise<void> {
    return this.authService.createUser(authDto);
  }

  @Post('/signin')
  public signIn(@Body() authDto: AuthDto): Promise<AccessToken> {
    return this.authService.getUser(authDto);
  }
}
