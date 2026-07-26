import {
  Column,
  CreateDateColumn,
  Entity,
  JoinColumn,
  JoinTable,
  ManyToMany,
  ManyToOne,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';
import { User } from '../../users/entities/user.entity';
import { Media } from '../../media/entities/media.entity';
import { Filter } from '../../filters/entities/filter.entity';

@Entity('Category')
export class Category {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({ type: 'varchar', nullable: false })
  title: string;

  @Column({ type: 'varchar', nullable: false })
  alias: string;

  @ManyToOne(() => Media, { onUpdate: 'CASCADE', nullable: false })
  @JoinColumn({ name: 'Media_Category' })
  icon: Media;

  @ManyToOne(() => User, { nullable: false, onUpdate: 'CASCADE' })
  @JoinColumn({ name: 'User_Category' })
  user: User;

  @ManyToMany(() => Filter, { nullable: false, onUpdate: 'CASCADE' })
  @JoinTable({ name: 'Filter_Category' })
  filters: Filter[];

  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updatedAt: Date;
}
