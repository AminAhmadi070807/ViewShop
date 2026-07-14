import {
  Column,
  CreateDateColumn,
  Entity,
  JoinColumn,
  ManyToOne,
  OneToOne,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';
import { User } from '../../users/entities/user.entity';
import { Target } from '../../target/entities/target.entity';

@Entity('Report')
export class Report {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({ type: 'varchar', nullable: false })
  reason: string;

  @Column({ type: 'varchar', nullable: false })
  description: string;

  @Column({ type: 'varchar', nullable: true })
  answer: string;

  @Column({ type: 'boolean', default: false })
  isAnswer: boolean;

  @ManyToOne(() => Target, { onUpdate: 'CASCADE', nullable: false })
  @JoinColumn({ name: 'Target_Report' })
  target: Target;

  @OneToOne(() => User, { onDelete: 'CASCADE', nullable: false })
  @JoinColumn({ name: 'User_Report' })
  user: User;

  @OneToOne(() => User, {
    onDelete: 'CASCADE',
    onUpdate: 'CASCADE',
    nullable: true,
  })
  @JoinColumn({ name: 'Admin_Report' })
  admin: User;

  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updatedAt: Date;
}
