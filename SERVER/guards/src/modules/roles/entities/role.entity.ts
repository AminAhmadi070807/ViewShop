import {
  Column,
  CreateDateColumn,
  Entity,
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

  @ManyToMany(() => Guard, (guard: Guard) => guard.roles, {
    onDelete: 'CASCADE',
    onUpdate: 'CASCADE',
  })
  guards: Guard[];

  @ManyToMany(() => User, (user: User) => user.roles)
  users: User[];

  @OneToMany(() => Singular, (singular: Singular) => singular.role, {
    onDelete: 'CASCADE',
    onUpdate: 'CASCADE',
  })
  singulars: Singular[];

  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updatedAt: Date;
}
