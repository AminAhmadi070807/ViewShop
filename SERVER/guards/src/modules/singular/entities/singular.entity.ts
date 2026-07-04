import {
  Column,
  CreateDateColumn,
  Entity,
  JoinColumn,
  JoinTable,
  ManyToMany,
  OneToMany,
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

  @OneToMany(() => Permission, (permission: Permission) => permission.singulars)
  @JoinColumn()
  permissions: Permission[];

  @ManyToMany(() => Role, (role: Role) => role.singulars, {
    nullable: false,
  })
  @JoinTable()
  roles: Role[];

  @Column({ type: 'simple-json', nullable: false })
  data: [
    {
      role: string;
      permissions: [{ id: string }];
    },
  ];

  @CreateDateColumn()
  createdAt: Date;
}
