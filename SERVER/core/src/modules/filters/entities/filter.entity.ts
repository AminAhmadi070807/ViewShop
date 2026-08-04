import {
  Column,
  CreateDateColumn,
  Entity,
  JoinTable,
  ManyToMany,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';
import { FilterType } from '../../filter-type/entities/filter-type.entity';
import { FilterTypeEnum } from '../../../common/enums/filters/filter.enum';

@Entity('Filter')
export class Filter {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({ type: 'varchar', nullable: false, unique: true })
  title: string;

  @Column({ type: 'enum', enum: FilterTypeEnum, nullable: false })
  type: FilterTypeEnum;

  @ManyToMany(() => FilterType, { nullable: false })
  @JoinTable({ name: 'FilterType_Filter' })
  filterTypes: FilterType[];

  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updatedAt: Date;
}
