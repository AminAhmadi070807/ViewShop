import {
  Column,
  CreateDateColumn,
  Entity,
  JoinColumn,
  ManyToOne,
  OneToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { User } from '../../users/entities/user.entity';
import { Media } from '../../media/entities/media.entity';
import { Category } from '../../categories/entities/category.entity';
import { StoryStatusEnum } from '../../../common/enums/story/status.enum';

@Entity('stories')
export class Story {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({ type: 'varchar', nullable: false })
  title: string;

  @ManyToOne(() => User, {
    onDelete: 'CASCADE',
    onUpdate: 'CASCADE',
    nullable: false,
  })
  @JoinColumn({
    name: 'user_story',
  })
  user: User;

  @Column({ type: 'varchar', nullable: false })
  link: string;

  @ManyToOne(() => Media, { nullable: false, eager: true })
  @JoinColumn({
    name: 'story_banner',
  })
  banner: Media;

  @OneToOne(() => Media, { nullable: false, eager: true })
  @JoinColumn({
    name: 'story_video',
  })
  video: Media;

  @Column({ type: 'smallint', nullable: false, default: 0 })
  like: number;

  @ManyToOne(() => Category, { nullable: false, eager: true })
  @JoinColumn({
    name: 'story_category',
  })
  category: Category;

  @Column({ type: 'uuid', nullable: true })
  payment: string;

  @Column({
    type: 'enum',
    enum: StoryStatusEnum,
    default: StoryStatusEnum.PENDING,
  })
  status: StoryStatusEnum;

  @Column({ type: 'bigint', nullable: false, unique: true })
  alias: number;

  @CreateDateColumn()
  createdAt: Date;
}
