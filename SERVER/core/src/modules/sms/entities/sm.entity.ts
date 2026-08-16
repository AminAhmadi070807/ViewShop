import {
  Column,
  CreateDateColumn,
  Entity,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { SmsEnum } from '../../../common/enums/sms/sms.enum';

@Entity('Sms')
export class Sms {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({ type: 'string', nullable: false })
  phone: string;

  @Column({ type: 'string', nullable: false })
  message: string;

  @Column({ type: 'enum', enum: SmsEnum, default: SmsEnum.OTP })
  status: SmsEnum;

  @CreateDateColumn()
  createdAt: Date;
}
