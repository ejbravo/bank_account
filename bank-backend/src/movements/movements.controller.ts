import { Body, Controller, Get, Post, UseGuards } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { GetUser } from '../auth/get-user.decorator';
import { User } from '../auth/user.entity';
import { MovementDto } from './dto/movement.dto';
import { Movement } from './movement.entity';
import { MovementsService } from './movements.service';

@Controller('movements')
@UseGuards(AuthGuard('jwt'))
export class MovementsController {
  constructor(private movementService: MovementsService) {}

  @Get('list')
  public async list(@GetUser() user: User): Promise<Movement[]> {
    return await this.movementService.getMovements(user);
  }

  @Post('income')
  income(
    @Body() movementDto: MovementDto,
    @GetUser() user: User,
  ): Promise<Movement> {
    return this.movementService.income(movementDto, user);
  }

  @Post('withdraw')
  withdraw(
    @Body() MovementDto: MovementDto,
    @GetUser() user: User,
  ): Promise<Movement> {
    return this.movementService.withdraw(MovementDto, user);
  }
}
