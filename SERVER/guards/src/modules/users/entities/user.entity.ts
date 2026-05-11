import {
  Column,
  Entity,
  JoinTable,
  ManyToMany,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { Role } from '../../roles/entities/role.entity';

@Entity('users')
export class User {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({ type: 'uuid', nullable: false, unique: true })
  user: string;

  @Column({ type: 'boolean', nullable: false, default: false })
  banned: boolean;

  @ManyToMany(() => Role, (role: Role) => role.users, { eager: true })
  @JoinTable({
    name: 'users_roles',
    joinColumn: { name: 'role_id' },
    inverseJoinColumn: { name: 'user_id' },
  })
  roles: Role[];
}
