import {
  Column,
  CreateDateColumn,
  Entity,
  ManyToOne,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';
import { GuardEnum, MethodEnum } from '../../../common/enums/guards/guard.enum';
import { Feature } from '../../features/entities/feature.entity';
import { Permission } from '../../permissions/entities/permission.entity';

@Entity('guards')
export class Guard {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @ManyToOne(() => Feature, (feature: Feature) => feature.guards, {
    onUpdate: 'CASCADE',
    nullable: false,
  })
  feature: Feature;

  @Column({ type: 'enum', enum: GuardEnum, nullable: false })
  service: GuardEnum;

  @Column({ type: 'enum', enum: MethodEnum, nullable: false })
  method: MethodEnum;

  @ManyToOne(() => Permission, (permission: Permission) => permission.guards, {
    nullable: false,
    onUpdate: 'CASCADE',
  })
  permission: Permission;

  @Column({ type: 'boolean', nullable: false, default: false })
  public: boolean;

  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updatedAt: Date;
}
