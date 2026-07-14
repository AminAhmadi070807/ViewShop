import {
  Column,
  Entity,
  JoinColumn,
  OneToOne,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';
import { User } from '../../users/entities/user.entity';

@Entity('Wallet')
export class Wallet {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @OneToOne(() => User, {
    nullable: false,
    onUpdate: 'CASCADE',
  })
  @JoinColumn({ name: 'User_Wallet' })
  user: User;

  @Column({ type: 'bigint', nullable: false, default: 0 })
  amount: number;

  @UpdateDateColumn()
  updateAt: Date;
}
