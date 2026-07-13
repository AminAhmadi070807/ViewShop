import {
  Column,
  CreateDateColumn,
  Entity,
  JoinColumn,
  ManyToOne,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';
import { PaymentModelEnum } from '../../../common/enums/payment/ipg.enum';
import { PaymentSectionEnum } from '../../../common/enums/payment/section.enum';
import { PaymentStatusEnum } from '../../../common/enums/payment/status.enum';
import { User } from '../../users/entities/user.entity';

@Entity('payments')
export class Payment {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @ManyToOne(() => User, { nullable: false })
  @JoinColumn({ name: 'user_payments' })
  user: User;

  @Column({ type: 'bigint', nullable: false, default: 0 })
  amount: number;

  @Column({ type: 'uuid', nullable: false })
  service_id: string;

  @Column({
    type: 'enum',
    enum: PaymentStatusEnum,
    default: PaymentStatusEnum.WAITING,
    nullable: false,
  })
  status: PaymentStatusEnum;

  @Column({
    type: 'enum',
    enum: PaymentModelEnum,
    nullable: false,
    default: PaymentModelEnum.ZIBAL,
  })
  IPG: PaymentModelEnum;

  @Column({
    type: 'enum',
    enum: PaymentSectionEnum,
    nullable: false,
  })
  service: PaymentSectionEnum;

  @Column({ type: 'varchar', nullable: false })
  code: string | number;

  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updatedAt: Date;
}
