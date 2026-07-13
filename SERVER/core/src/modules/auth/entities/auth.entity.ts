import {
  Column,
  CreateDateColumn,
  Entity,
  JoinColumn,
  ManyToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { User } from '../../users/entities/user.entity';

@Entity('auth')
export class Auth {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({ type: 'varchar', nullable: false })
  token: string;

  @ManyToOne(() => User, {
    nullable: true,
    onUpdate: 'CASCADE',
  })
  @JoinColumn({ name: 'tokens' })
  user: User;

  @Column({ type: 'varchar', nullable: false, unique: true })
  secret: string;

  @CreateDateColumn()
  createdAt: Date;
}
