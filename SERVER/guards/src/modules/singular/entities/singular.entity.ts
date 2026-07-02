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
  @JoinTable()
  permissions: Permission[];

  @ManyToMany(() => Role, {
    nullable: false,
  })
  @JoinTable()
  roles: Role[];

  @CreateDateColumn()
  createdAt: Date;
}
