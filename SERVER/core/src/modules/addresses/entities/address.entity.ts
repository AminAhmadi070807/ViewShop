import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  Index,
  CreateDateColumn,
} from 'typeorm';

@Entity('addresses') // This is the table name in PostgreSQL
export class Address {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({ type: 'uuid', nullable: true })
  user: string;

  @Column({ type: 'varchar', length: 100, nullable: false })
  @Index()
  province: string;

  @Column({ type: 'varchar', length: 100, nullable: false })
  @Index()
  city: string;

  @Column({ type: 'varchar', nullable: false })
  street: string;

  @Column({ type: 'varchar', length: 100, nullable: false })
  @Index()
  alley: string;

  @Column({ type: 'varchar', nullable: false })
  address: string;

  @Column({ type: 'varchar', length: 20, nullable: true })
  @Index()
  postal_code: string | null;

  @CreateDateColumn()
  createdAt: Date;
}
