import {
  Column,
  CreateDateColumn,
  Entity,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { SmsEnum, SmsServiceEnum } from '../../../common/enums/sms/sms.enum';

@Entity('SmsSetting')
export class SmsSetting {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({ type: 'enum', enum: SmsEnum, default: SmsEnum.OTP })
  section: SmsEnum;

  @Column({ type: 'enum', enum: SmsServiceEnum, unique: true })
  service: SmsServiceEnum;

  @Column({ type: 'jsonb', nullable: false })
  details: { id: string; title: string; value: string }[];

  @CreateDateColumn()
  createdAt: Date;
}
