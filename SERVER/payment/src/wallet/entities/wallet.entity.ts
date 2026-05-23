import {
  Column,
  Entity,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';

@Entity('wallet')
export class Wallet {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({ type: 'uuid', nullable: false, unique: true })
  user: string;

  @Column({ type: 'smallint', nullable: false, default: 0 })
  wallet: number;

  @UpdateDateColumn()
  updateAt: Date;
}
