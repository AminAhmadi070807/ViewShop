import {
  Column,
  CreateDateColumn,
  Entity,
  ManyToOne,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';
import { GuardEnum, MethodEnum } from '../../../common/enums/guards/guard.enum';
import { Singular } from '../../singular/entities/singular.entity';
import { Feature } from '../../features/entities/feature.entity';
import { Role } from '../../roles/entities/role.entity';
import { Permission } from '../../permissions/entities/permission.entity';

@Entity('guards')
export class Guard {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @ManyToOne(() => Feature, { onUpdate: 'CASCADE', nullable: false })
  feature: Singular;

  @Column({ type: 'enum', enum: GuardEnum, nullable: false })
  service: GuardEnum;

  @Column({ type: 'enum', enum: MethodEnum, nullable: false })
  method: MethodEnum;

  @ManyToOne(() => Role, { nullable: false })
  permission: Permission;

  @Column({ type: 'boolean', nullable: false, default: false })
  public: boolean;

  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updatedAt: Date;
}
