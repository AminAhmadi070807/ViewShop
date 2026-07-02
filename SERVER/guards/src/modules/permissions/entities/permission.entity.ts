import {
  Column,
  CreateDateColumn,
  Entity,
  JoinTable,
  ManyToMany,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';
import { PermissionEnum } from '../../../common/enums/permission/permission.enum';
import { Singular } from '../../singular/entities/singular.entity';

@Entity('permissions')
export class Permission {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({ type: 'enum', enum: PermissionEnum, nullable: false })
  title: PermissionEnum;

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
