import {
  Column,
  CreateDateColumn,
  Entity,
  JoinTable,
  ManyToMany,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';
import { Role } from '../../roles/entities/role.entity';
import { GuardEnum, MethodEnum } from '../../../common/enums/guards/guard.enum';

@Entity('guards')
export class Guard {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({ type: 'varchar', length: 255, nullable: false })
  patch: string;

  @Column({ type: 'enum', enum: MethodEnum, nullable: false })
  method: MethodEnum;

  @ManyToMany(() => Role, {
    eager: true,
    onUpdate: 'CASCADE',
  })
  @JoinTable()
  roles: Role[];

  @Column({ type: 'boolean', nullable: false, default: false })
  public: boolean;

  @Column({ type: 'enum', enum: GuardEnum, nullable: false })
  service: GuardEnum;

  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updatedAt: Date;
}
