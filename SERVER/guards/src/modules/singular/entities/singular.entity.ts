import {
  Column,
  CreateDateColumn,
  Entity,
  JoinColumn,
  JoinTable,
  ManyToMany,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { Role } from '../../roles/entities/role.entity';
import { Permission } from '../../permissions/entities/permission.entity';

@Entity('singular')
export class Singular {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({ type: 'varchar', nullable: false })
  title: string;

  @ManyToMany(() => Permission, {
    onUpdate: 'CASCADE',
    nullable: false,
  })
  @JoinColumn()
  permissions: Permission[];

  @ManyToMany(() => Role, (role: Role) => role.singulars, {
    nullable: false,
  })
  @JoinTable({
    name: 'singular_roles',
    joinColumns: [
      {
        name: 'singular_id',
        referencedColumnName: 'id',
      },
    ],
    inverseJoinColumns: [
      {
        name: 'role_id',
        referencedColumnName: 'id',
      },
    ],
  })
  roles: Role[];

  @CreateDateColumn()
  createdAt: Date;
}
