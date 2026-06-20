import {
  Column,
  CreateDateColumn,
  Entity,
  ManyToOne,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';
import { Category } from '../../categories/entities/category.entity';
import { Media } from '../../media/entities/media.entity';
import { User } from '../../users/entities/user.entity';
import { ArticleStatusEnum } from '../../../common/enums/articles/articles.status';

@Entity('articles')
export class Article {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({ type: 'varchar', nullable: false, unique: true })
  title: string;

  @Column({ type: 'varchar', nullable: false, array: true })
  slug: [string];

  @ManyToOne(() => Category, { nullable: false, eager: true })
  category: Category;

  @Column({ type: 'smallint', nullable: false, default: 0 })
  views: number;

  @ManyToOne(() => Media, { nullable: false, eager: true })
  cover: Media;

  @Column({ type: 'text', nullable: false })
  description: string;

  @ManyToOne(() => User, { nullable: false, eager: true })
  author: User;

  @Column({
    type: 'enum',
    enum: ArticleStatusEnum,
    default: ArticleStatusEnum.DRAFT,
  })
  status: ArticleStatusEnum;

  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updatedAt: Date;

  @Column({ nullable: true })
  publishedAt: Date;
}
