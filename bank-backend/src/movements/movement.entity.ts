import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';
import { MovementType } from './types';

@Entity()
export class Movement {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  date: string;

  @Column()
  type: MovementType;

  @Column()
  amount: number;

  @Column()
  balance: number;
}
