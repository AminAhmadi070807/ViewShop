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

  @Column({ type: 'varchar', nullable: false })
  code: string;

  @Column({ type: 'varchar', nullable: false })
  permitted: string;

  @Column({ type: 'smallint', nullable: false })
  percent: string;

  @Column({ type: 'bigint', nullable: false })
  max_discount: string;

  @Column({ type: 'bigint', nullable: true })
  user_phone: string;

  @Column({ type: 'timestamp', nullable: false })
  expiration: string;

  @CreateDateColumn()
  createdAt: Date;
}
