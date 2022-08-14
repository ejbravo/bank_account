import { Body, Controller, Get, Post, UseGuards, Logger } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { trimCardId } from 'src/utils';
import { GetUser } from '../auth/get-user.decorator';
import { User } from '../auth/user.entity';
import { MovementDto } from './dto/movement.dto';
import { Movement } from './movement.entity';
import { MovementsService } from './movements.service';

@Controller('movements')
@UseGuards(AuthGuard('jwt'))
export class MovementsController {
  private logger = new Logger('MovementsController');

  constructor(private movementService: MovementsService) {}

  @Get('list')
  public async list(@GetUser() user: User): Promise<Movement[]> {
    const trimedCardId = trimCardId(user.cardId);
    this.logger.verbose(`User "${trimedCardId}" retrieving all movements`);
    return await this.movementService.getMovements(user);
  }

  @Post('income')
  income(
    @Body() movementDto: MovementDto,
    @GetUser() user: User,
  ): Promise<Movement> {
    const { amount } = movementDto;
    const trimedCardId = trimCardId(user.cardId);
    this.logger.verbose(`User "${trimedCardId}" INCOME of ${amount}.00€`);
    return this.movementService.income(movementDto, user);
  }

  @Post('withdraw')
  withdraw(
    @Body() movementDto: MovementDto,
    @GetUser() user: User,
  ): Promise<Movement> {
    const { amount } = movementDto;
    const trimedCardId = trimCardId(user.cardId);
    this.logger.verbose(`User "${trimedCardId}" WITHDRAW of ${amount}.00€`);
    return this.movementService.withdraw(movementDto, user);
  }
}
