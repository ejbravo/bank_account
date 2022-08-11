import { IsNotEmpty } from 'class-validator';

export class MovementDto {
  @IsNotEmpty()
  amount: string;
}
