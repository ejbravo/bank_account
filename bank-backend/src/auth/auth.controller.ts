import { Body, Controller, Post } from '@nestjs/common';
import { AuthService } from './auth.service';
import { AuthDto } from './dto/auth.dto';

@Controller('auth')
export class AuthController {
  constructor(private authService: AuthService) {}

  @Post('/signup')
  public signUp(@Body() authDto: AuthDto): Promise<void> {
    return this.authService.createUser(authDto);
  }

  @Post('/signin')
  public signIn(@Body() authDto: AuthDto): Promise<string> {
    return this.authService.getUser(authDto);
  }
}
