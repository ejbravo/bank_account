import { Body, Controller, Get, Post } from '@nestjs/common';
import { MovementDto } from './dto/movement.dto';
import { Movement } from './movement.entity';
import { MovementsService } from './movements.service';

@Controller('movements')
export class MovementsController {
  constructor(private movementService: MovementsService) {}

  @Get('list')
  public async list(): Promise<Movement[]> {
    return await this.movementService.getMovements();
  }

  // @Post('income')
  // income(@Body() movementDto: MovementDto): Promise<Movement> {
  //   return this.movementService.income(movementDto);
  // }

  // @Post('withdraw')
  // withdraw(@Body() MovementDto: MovementDto): Promise<Movement> {
  //   return this.movementService.withdraw(MovementDto);
  // }
}
