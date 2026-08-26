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
  api: string;

  @Column({ type: 'varchar', nullable: false, unique: true })
  key: string;

  @Column({ type: 'varchar', nullable: false })
  call_back: string;

  @Column({ type: 'varchar', nullable: false, unique: true })
  url: string;

  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updatedAt: Date;
}
