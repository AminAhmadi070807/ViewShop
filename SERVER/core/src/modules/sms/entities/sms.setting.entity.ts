import {
  Column,
  CreateDateColumn,
  Entity,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { SmsEnum, SmsServiceEnum } from '../../../common/enums/sms/sms.enum';

@Entity('Sms_Setting')
export class Sms_Setting {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({ type: 'enum', enum: SmsEnum, default: SmsEnum.OTP })
  section: SmsEnum;

  @Column({ type: 'enum', enum: SmsServiceEnum })
  service: SmsServiceEnum;

  @CreateDateColumn()
  createdAt: Date;
}
