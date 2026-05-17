import {
  Column,
  CreateDateColumn,
  Entity,
  ManyToOne,
  OneToMany,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { Role } from '../../roles/entities/role.entity';
import { Permission } from '../../permissions/entities/permission.entity';

@Entity('singular')
export class Singular {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({ type: 'varchar', nullable: false, unique: true })
  title: string;

  @OneToMany(
    () => Permission,
    (permission: Permission) => permission.singular,
    {
      onUpdate: 'CASCADE',
      nullable: false,
    },
  )
  permissions: Permission[];

  @ManyToOne(() => Role, (role: Role) => role.singulars, {
    onUpdate: 'CASCADE',
    nullable: false,
  })
  role: Role;

  @CreateDateColumn()
  createdAt: Date;
}
