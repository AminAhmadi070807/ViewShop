import {
  Column,
  Entity,
  JoinColumn,
  ManyToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { User } from '../../users/entities/user.entity';
import { Media } from '../../media/entities/media.entity';

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
  @JoinColumn({ name: 'user_Category' })
  user: User;
}
