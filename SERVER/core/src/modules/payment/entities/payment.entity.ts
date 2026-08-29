import {
  Column,
  CreateDateColumn,
  Entity,
  JoinColumn,
  ManyToOne,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';
import { PaymentStatusEnum } from '../../../common/enums/payment/status.enum';
import { User } from '../../users/entities/user.entity';
import { PaymentSetting } from './payment.setting.entity';

@Entity('Payment')
export class Payment {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @ManyToOne(() => User, { nullable: false })
  @JoinColumn({ name: 'User_Payment' })
  user: User;

  @Column({ type: 'bigint', nullable: false, default: 0 })
  amount: number;

  @Column({
    type: 'enum',
    enum: PaymentStatusEnum,
    default: PaymentStatusEnum.WAITING,
    nullable: false,
  })
  status: PaymentStatusEnum;

  @ManyToOne(() => PaymentSetting, { nullable: false })
  @JoinColumn({ name: 'Payment_PaymentSetting' })
  service: PaymentSetting;

  @Column({ type: 'varchar', nullable: false })
  code: string;

  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updatedAt: Date;
}
