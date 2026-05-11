import {
  Column,
  Entity,
  JoinTable,
  ManyToMany,
  OneToMany,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { Permission } from '../../permissions/entities/permission.entity';
import { Guard } from '../../guards/entities/guard.entity';
import { User } from '../../users/entities/user.entity';

@Entity('roles')
export class Role {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({ type: 'varchar', nullable: false, unique: true })
  title: string;

  @OneToMany(() => Permission, (permission: Permission) => permission.role, {
    eager: true,
  })
  permissions: Permission[];

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
}
