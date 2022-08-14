import { IsString, Length, Matches } from 'class-validator';

export class AuthDto {
  @IsString()
  @Length(16, 16, { message: 'cardId must contain 16 characters' })
  @Matches(/^[0-9]*$/, { message: 'cardId must contain only numbers' })
  cardId: string;

  @IsString()
  @Length(4, 4, { message: 'pin must contain 4 characters' })
  @Matches(/^[0-9]*$/, { message: 'pin must contain only numbers' })
  pin: string;
}
