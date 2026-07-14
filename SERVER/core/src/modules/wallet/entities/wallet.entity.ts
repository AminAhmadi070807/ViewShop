import {
  Column,
  Entity,
  OneToOne,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';
import { User } from '../../users/entities/user.entity';

@Entity('wallet')
export class Wallet {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @OneToOne(() => User, (user: User) => user.wallet, {
    nullable: false,
    onUpdate: 'CASCADE',
  })
  user: User;

  @Column({ type: 'bigint', nullable: false, default: 0 })
  amount: number;

  @UpdateDateColumn()
  updateAt: Date;
}
