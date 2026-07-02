import {
  Column,
  CreateDateColumn,
  Entity,
  JoinColumn,
  JoinTable,
  ManyToMany,
  OneToMany,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';
import { Guard } from '../../guards/entities/guard.entity';
import { User } from '../../users/entities/user.entity';
import { Singular } from '../../singular/entities/singular.entity';

@Entity('roles')
export class Role {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({ type: 'varchar', nullable: false, unique: true })
  title: string;

  @ManyToMany(() => Guard, {
    onUpdate: 'CASCADE',
  })
  @JoinColumn()
  guards: Guard[];

  @Column({ type: 'smallint', nullable: false, default: 0 })
  score: number;

  @OneToMany(() => User, (user: User) => user.role)
  @JoinColumn()
  users: User[];

  @ManyToMany(() => Singular, {
    onUpdate: 'CASCADE',
  })
  @JoinTable()
  singulars: Singular[];

  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updatedAt: Date;
}
