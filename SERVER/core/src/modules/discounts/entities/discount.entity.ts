import {
  Column,
  CreateDateColumn,
  Entity,
  PrimaryGeneratedColumn,
} from 'typeorm';

@Entity('Discount')
export class Discount {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({ type: 'varchar', nullable: false })
  title: string;

  @Column({ type: 'varchar', nullable: false, unique: true })
  code: string;

  @Column({ type: 'bigint', nullable: false })
  permitted: number;

  @Column({ type: 'smallint', nullable: false })
  percent: number;

  @Column({ type: 'bigint', nullable: false })
  max_discount: number;

  @Column({ type: 'varchar', nullable: true })
  user_phone: string;

  @Column({ type: 'timestamp', nullable: false })
  expiration: Date;

  @CreateDateColumn()
  createdAt: Date;
}
