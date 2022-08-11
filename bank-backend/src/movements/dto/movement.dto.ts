import { IsNotEmpty, IsNumber } from 'class-validator';

export class MovementDto {
  @IsNotEmpty()
  @IsNumber()
  amount: number;
}
