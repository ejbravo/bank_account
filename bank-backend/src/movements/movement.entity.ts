import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

// export interface Movement {
//   id: string;
//   date: number;
//   type: MovementType;
//   amount: number;
//   balance: number;
// }

export enum MovementType {
  INCOME = 'income',
  WITHDRAW = 'withdraw',
}
@Entity()
export class Movement {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  date: number;

  @Column()
  type: MovementType;

  @Column()
  amount: number;

  @Column()
  balance: number;
}
