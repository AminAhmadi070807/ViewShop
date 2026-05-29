import {
  Column,
  Entity,
  OneToMany,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';
import { Payment } from '../../payment/entities/payment.entity';

@Entity('wallet')
export class Wallet {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({ type: 'uuid', nullable: false, unique: true })
  user: string;

  @Column({ type: 'bigint', nullable: false, default: 0 })
  amount: number;

  @OneToMany(() => Payment, (payment: Payment): Wallet => payment.wallet)
  payments: Payment[];

  @UpdateDateColumn()
  updateAt: Date;
}
