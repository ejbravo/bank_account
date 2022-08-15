import { Movement } from '../movements/movement.entity';
import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
export class User {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({ unique: true })
  cardId: string;

  @Column()
  pin: string;

  @Column()
  account: number;

  @OneToMany((_type) => Movement, (movement) => movement.user, { eager: true })
  movements: Movement[];
}
