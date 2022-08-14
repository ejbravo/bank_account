import { User } from '../auth/user.entity';
import { Column, Entity, ManyToOne, PrimaryGeneratedColumn } from 'typeorm';
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

  @ManyToOne((_type) => User, (user) => user.movements, { eager: false })
  user: User;
}
