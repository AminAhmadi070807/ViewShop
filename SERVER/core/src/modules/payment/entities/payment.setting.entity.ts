import {
  Column,
  CreateDateColumn,
  Entity,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';

@Entity('Payment_Setting')
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

  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updatedAt: Date;
}
