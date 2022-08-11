export interface Movement {
  id: string;
  date: number;
  type: MovementType;
  amount: number;
  balance: number;
}

export enum MovementType {
  INCOME = 'income',
  WITHDRAW = 'withdraw',
}
