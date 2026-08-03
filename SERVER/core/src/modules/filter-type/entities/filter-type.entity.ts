import {
  Column,
  CreateDateColumn,
  Entity,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';
import { FilterTypeEnum } from '../../../common/enums/filters/filter.enum';

@Entity('Filter_Type')
export class FilterType {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({ type: 'varchar', nullable: false, unique: true })
  title: string;

  @Column({ type: 'enum', enum: FilterTypeEnum, nullable: false })
  type: FilterTypeEnum;

  @Column({ type: 'jsonb', nullable: true, default: [] })
  details: {
    title: string;
    alias: string;
  }[];

  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updatedAt: Date;
}
