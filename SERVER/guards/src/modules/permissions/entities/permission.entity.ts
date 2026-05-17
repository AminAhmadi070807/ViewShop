import {
  Column,
  CreateDateColumn,
  Entity,
  ManyToOne,
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

  @ManyToOne(() => Singular, (singular: Singular) => singular.permissions, {
    eager: true,
    onUpdate: 'CASCADE',
  })
  singular: Singular;

  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updatedAt: Date;
}
