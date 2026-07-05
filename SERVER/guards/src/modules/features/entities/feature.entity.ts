import {
  Column,
  CreateDateColumn,
  Entity,
  JoinTable,
  ManyToMany,
  OneToMany,
  OneToOne,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';
import { Guard } from '../../guards/entities/guard.entity';
import { Role } from '../../roles/entities/role.entity';
import { Singular } from '../../singular/entities/singular.entity';

@Entity('features')
export class Feature {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({ type: 'varchar', nullable: false, unique: true })
  title: string;

  @OneToMany(() => Guard, (guard: Guard) => guard.feature, {
    onUpdate: 'CASCADE',
    nullable: true,
  })
  guards: Guard[];

  @ManyToMany(() => Role, (role: Role) => role.features, { nullable: false })
  @JoinTable({ name: 'features_roles' })
  roles: Role[];

  @OneToOne(() => Singular, (singular) => singular.feature)
  singular: Singular;

  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updatedAt: Date;
}
