import {
  Column,
  CreateDateColumn,
  Entity,
  JoinColumn,
  OneToOne,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';
import { Media } from '../../media/entities/media.entity';

@Entity('PaymentSetting')
export class PaymentSetting {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({ type: 'varchar', nullable: false, unique: true })
  title: string;

  @Column({ type: 'varchar', nullable: false, unique: true })
  alias: string;

  @Column({ type: 'jsonb', nullable: false })
  details: { title: string; value: string; pattern: string }[];

  @Column({ type: 'varchar', nullable: false, unique: true })
  payment_key: string;

  @Column({ type: 'varchar', nullable: false, unique: true })
  call_back: string;

  @Column({ type: 'varchar', nullable: false, unique: true })
  api: string;

  @Column({ type: 'boolean', nullable: false, default: false })
  status: boolean;

  @OneToOne(() => Media, { nullable: false })
  @JoinColumn({ name: 'Media_PaymentSetting' })
  media: Media;

  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updatedAt: Date;
}
