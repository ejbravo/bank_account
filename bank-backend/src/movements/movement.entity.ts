import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';
import { MovementType } from './types';

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
