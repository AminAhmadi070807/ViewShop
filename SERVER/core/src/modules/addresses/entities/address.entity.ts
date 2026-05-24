import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  CreateDateColumn,
  ManyToOne,
} from 'typeorm';
import { User } from '../../users/entities/user.entity';

@Entity('addresses')
export class Address {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @ManyToOne(() => User, (user: User) => user.addresses, {
    onDelete: 'CASCADE',
    nullable: false,
  })
  user: string;

  @Column({ type: 'varchar', length: 100, nullable: false })
  province: string;

  @Column({ type: 'varchar', length: 100, nullable: false })
  city: string;

  @Column({ type: 'varchar', nullable: false })
  street: string;

  @Column({ type: 'varchar', length: 100, nullable: false })
  alley: string;

  @Column({ type: 'varchar', nullable: false })
  address: string;

  @Column({ type: 'varchar', length: 20, nullable: true })
  postal_code: string | null;

  @CreateDateColumn()
  createdAt: Date;
}
