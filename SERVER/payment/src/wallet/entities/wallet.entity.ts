import {
  Column,
  Entity,
  OneToMany,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';
import { Payment } from '../../modules/payment/entities/payment.entity';

@Entity('wallet')
export class Wallet {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({ type: 'uuid', nullable: false, unique: true })
  user: string;

  @Column({ type: 'smallint', nullable: false, default: 0 })
  amount: number;

  @OneToMany(() => Payment, (payment) => payment.wallet, {
    nullable: false,
  })
  payments: Payment[];

  @UpdateDateColumn()
  updateAt: Date;
}
