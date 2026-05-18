import {
  Column,
  Entity,
  OneToOne,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';
import { User } from '../../users/entities/user.entity';

@Entity('wallets')
export class Wallet {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({ type: 'bigint', default: 0, nullable: false })
  money: 0;

  @OneToOne((): typeof User => User, (user: User): Wallet => user.wallet, {
    onUpdate: 'CASCADE',
    onDelete: 'CASCADE',
  })
  user: User;

  @UpdateDateColumn()
  updatedAt: Date;
}
