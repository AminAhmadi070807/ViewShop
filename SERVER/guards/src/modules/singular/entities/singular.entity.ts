import {
  Column,
  CreateDateColumn,
  Entity,
  OneToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { Feature } from '../../features/entities/feature.entity';

@Entity('singular')
export class Singular {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @OneToOne(() => Feature, { nullable: false, onUpdate: 'CASCADE' })
  feature: Feature;

  @Column({ type: 'simple-json', nullable: false })
  data: [
    {
      role: string;
      permissions: string[];
    },
  ];

  @CreateDateColumn()
  createdAt: Date;
}
