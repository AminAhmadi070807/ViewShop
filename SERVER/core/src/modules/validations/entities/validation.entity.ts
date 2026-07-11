import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';
import { PaymentStatusEnum } from '../../../common/enums/payment/status.enum';
import { PaymentModelEnum } from '../../../common/enums/payment/ipg.enum';

@Entity('validations')
export class Validation {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({ type: 'enum', enum: PaymentModelEnum, nullable: false })
  IPG: PaymentModelEnum;

  @Column({
    type: 'enum',
    enum: PaymentStatusEnum,
    nullable: false,
    default: PaymentStatusEnum.WAITING,
  })
  status: PaymentStatusEnum;

  @Column({ type: 'smallint', nullable: false })
  statusCode: number;

  @Column({ type: 'varchar', nullable: false })
  description: string;
}
