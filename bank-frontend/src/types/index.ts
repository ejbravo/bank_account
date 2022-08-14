export interface AuthDto {
  cardId: string;
  pin: string;
}

export interface Token {
  accessToken: string;
}

export enum MovementType {
  INCOME = 'income',
  WITHDRAW = 'withdraw',
}

export interface Movement {
  id: string;
  date: string;
  type: MovementType;
  amount: number;
  balance: number;
}

export interface Operation {
  amount: number;
}
