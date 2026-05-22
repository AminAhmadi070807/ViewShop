import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';
import { PaymentModelEnum } from '../../../common/interfaces/payment.interface';
import { PaymentStatusEnum } from '../../../common/enums/payment/status.enum';

@Entity('validations')
export class Validation {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({ type: 'enum', enum: PaymentModelEnum, nullable: false })
  IPG: PaymentModelEnum;

  @Column({ type: 'smallint', nullable: false })
  status: number;

  @Column({ type: 'varchar', nullable: false })
  description: string;
}
