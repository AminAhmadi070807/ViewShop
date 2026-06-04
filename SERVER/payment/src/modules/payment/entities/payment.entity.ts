import {
  Column,
  CreateDateColumn,
  Entity,
  ManyToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { PaymentStatusEnum } from '../../../common/enums/payment/status.enum';
import { PaymentModelEnum } from '../../../common/interfaces/payment.interface';
import { PaymentSectionEnum } from '../../../common/enums/payment/section.enum';
import { Wallet } from '../../wallet/entities/wallet.entity';

@Entity('payment')
export class Payment {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({ type: 'uuid', nullable: false })
  user: string;

  @Column({ type: 'bigint', nullable: false, default: 0 })
  amount: number;

  @Column({
    type: 'enum',
    enum: PaymentStatusEnum,
    nullable: false,
    default: PaymentStatusEnum.WAITING,
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
    default: PaymentSectionEnum.WALLET,
  })
  section: PaymentSectionEnum;

  @Column({ type: 'varchar', nullable: false })
  authority: string | number;

  @ManyToOne(() => Wallet, (wallet: Wallet): Payment[] => wallet.payments, {
    onDelete: 'CASCADE',
    onUpdate: 'CASCADE',
  })
  wallet: Wallet;

  @CreateDateColumn()
  createdAt: Date;
}
