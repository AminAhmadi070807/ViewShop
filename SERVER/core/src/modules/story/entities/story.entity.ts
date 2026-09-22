import {
  Column,
  CreateDateColumn,
  Entity,
  JoinColumn,
  ManyToOne,
  OneToOne,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';
import { User } from '../../users/entities/user.entity';
import { Media } from '../../media/entities/media.entity';
import { Category } from '../../categories/entities/category.entity';
import { StoryStatusEnum } from '../../../common/enums/story/status.enum';
import { Product } from '../../products/entities/product.entity';

@Entity('Story')
export class Story {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({ type: 'varchar', nullable: false })
  title: string;

  @Column({
    type: 'enum',
    enum: StoryStatusEnum,
    default: StoryStatusEnum.WAITING,
  })
  status: StoryStatusEnum;

  @Column({ type: 'smallint', nullable: false, default: 0 })
  like: number;

  @Column({ type: 'smallint', nullable: false, default: 0 })
  view: number;

  @ManyToOne(() => User, { nullable: false })
  @JoinColumn({ name: 'User_Story' })
  user: User;

  @ManyToOne(() => Product, { nullable: false })
  @JoinColumn({ name: 'Product_Story' })
  product: Product;

  @ManyToOne(() => Media, { nullable: false, eager: true })
  @JoinColumn({ name: 'Media_Banner_Story' })
  banner: Media;

  @OneToOne(() => Media, { nullable: false, eager: true })
  @JoinColumn({ name: 'Media_Video_Story' })
  video: Media;

  @ManyToOne(() => Category, { nullable: false, eager: true })
  @JoinColumn({ name: 'Category_Story' })
  category: Category;

  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updatedAt: Date;
}
