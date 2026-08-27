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

  @Column({ type: 'jsonb', nullable: false })
  details: { id: string; title: string; value: string }[];

  @Column({ type: 'varchar', nullable: false })
  call_back: string;

  @Column({ type: 'bigint', nullable: false })
  max_price: string;

  @Column({ type: 'boolean', nullable: false, default: false })
  status: boolean;

  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updatedAt: Date;
}
