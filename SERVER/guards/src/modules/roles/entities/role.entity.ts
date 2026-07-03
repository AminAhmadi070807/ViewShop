import {
  Column,
  CreateDateColumn,
  Entity,
  ManyToMany,
  ManyToOne,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';
import { Feature } from '../../features/entities/feature.entity';
import { Singular } from '../../singular/entities/singular.entity';

@Entity('roles')
export class Role {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({ type: 'varchar', nullable: false, unique: true })
  title: string;

  @Column({ type: 'varchar', nullable: false, unique: true })
  description: string;

  @Column({ type: 'smallint', nullable: false, default: 0 })
  score: number;

  @ManyToOne(() => Feature, (feature: Feature) => feature.roles, {
    nullable: false,
  })
  features: Feature[];

  @ManyToMany(() => Singular, (singular: Singular) => singular.roles)
  singulars: Singular[];

  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updatedAt: Date;
}
