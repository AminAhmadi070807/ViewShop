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

  @Column({ type: 'varchar', nullable: false })
  title: string;

  @OneToMany(() => Guard, (guard: Guard) => guard.feature, {
    onUpdate: 'CASCADE',
    nullable: true,
  })
  guards: Guard[];

  @ManyToMany(() => Role, { nullable: false })
  @JoinTable({ name: 'features_roles' })
  roles: Role[];

  @OneToOne(() => Singular, (singular) => singular.feature, { nullable: true })
  singular: Singular;

  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updatedAt: Date;
}
