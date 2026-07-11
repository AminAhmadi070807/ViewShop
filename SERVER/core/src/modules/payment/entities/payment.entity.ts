import {
  Column,
  CreateDateColumn,
  Entity,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { PaymentModelEnum } from '../../../common/enums/payment/ipg.enum';
import { PaymentSectionEnum } from '../../../common/enums/payment/section.enum';
import { PaymentStatusEnum } from '../../../common/enums/payment/status.enum';

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
    default: PaymentSectionEnum.WALLET,
  })
  section: PaymentSectionEnum;

  @Column({ type: 'varchar', nullable: false })
  code: string | number;

  @CreateDateColumn()
  createdAt: Date;
}
