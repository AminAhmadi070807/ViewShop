import {
  Column,
  CreateDateColumn,
  Entity,
  JoinColumn,
  ManyToOne,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';
import { SubCategory } from './sub.category.entity';
import { Media } from '../../media/entities/media.entity';
import { User } from '../../users/entities/user.entity';

@Entity('Attribute')
export class Attribute {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({ type: 'varchar', nullable: false })
  title: string;

  @Column({ type: 'varchar', nullable: false })
  alias: string;

  @ManyToOne((): typeof SubCategory => SubCategory, {
    onUpdate: 'CASCADE',
    nullable: false,
  })
  @JoinColumn({ name: 'SubCategory_Attribute' })
  subCategory: SubCategory;

  @ManyToOne(() => Media, {
    onUpdate: 'CASCADE',
    nullable: false,
  })
  @JoinColumn({ name: 'Media_Attribute' })
  icon: Media;

  @ManyToOne(() => User, {
    onUpdate: 'CASCADE',
    nullable: false,
  })
  @JoinColumn({ name: 'User_Attribute' })
  user: User;

  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updatedAt: Date;
}
