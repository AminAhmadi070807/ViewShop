import {
  Column,
  CreateDateColumn,
  Entity,
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

  @ManyToMany(() => Guard, (guard: Guard) => guard.roles, {
    onDelete: 'CASCADE',
    onUpdate: 'CASCADE',
  })
  @JoinTable({
    name: 'roles_guard',
    joinColumn: { name: 'guard_id' },
    inverseJoinColumn: { name: 'role_id' },
  })
  guards: Guard[];

  @ManyToMany(() => User, (user: User) => user.roles)
  @JoinTable({
    name: 'roles_users',
    joinColumn: { name: 'user_id' },
    inverseJoinColumn: { name: 'role_id' },
  })
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
