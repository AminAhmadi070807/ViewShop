import {
  Column,
  CreateDateColumn,
  Entity,
  JoinColumn,
  ManyToOne,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';
import { Category } from './category.entity';
import { User } from '../../users/entities/user.entity';
import { Media } from '../../media/entities/media.entity';

@Entity('SubCategory')
export class SubCategory {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({ type: 'varchar', nullable: false })
  title: string;

  @ManyToOne(() => Media, { onUpdate: 'CASCADE', nullable: false })
  @JoinColumn({ name: 'Media_SubCategory' })
  icon: Media;

  @Column({ type: 'varchar', nullable: false })
  alias: string;

  @ManyToOne(() => User)
  @JoinColumn({ name: 'User_SubCategory' })
  user: User;

  @ManyToOne(() => Category, {
    nullable: false,
    onUpdate: 'CASCADE',
  })
  @JoinColumn({ name: 'Category_SubCategory' })
  category: Category;

  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updatedAt: Date;
}
