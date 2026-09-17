import {
  Column,
  CreateDateColumn,
  Entity,
  JoinColumn,
  OneToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { Feature } from '../../features/entities/feature.entity';

@Entity('singular')
export class Singular {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @OneToOne(() => Feature, (feature: Feature) => feature.singular, {
    nullable: true,
    onUpdate: 'CASCADE',
  })
  @JoinColumn({ name: 'singular_feature' })
  feature: Feature;

  @Column({ type: 'simple-json', nullable: false })
  data: [{ role: string; permissions: string[] }];

  @CreateDateColumn()
  createdAt: Date;
}
