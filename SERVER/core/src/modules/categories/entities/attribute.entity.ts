import {
  Column,
  Entity,
  JoinColumn,
  ManyToMany,
  ManyToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { SubCategory } from './sub.category.entity';
import { Media } from '../../media/entities/media.entity';
import { User } from '../../users/entities/user.entity';
import { ParentProduct } from '../../products/entities/parent.product.entity';

@Entity('AttributesCategory')
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
  @JoinColumn({ name: 'sub_category_attribute' })
  subCategory: SubCategory;

  @ManyToMany((): typeof ParentProduct => ParentProduct, {
    onDelete: 'CASCADE',
    onUpdate: 'CASCADE',
    nullable: false,
  })
  parentProducts: ParentProduct[];

  @ManyToOne(() => Media, {
    onUpdate: 'CASCADE',
    nullable: false,
  })
  icon: Media;

  @ManyToOne(() => User, {
    eager: true,
    onUpdate: 'CASCADE',
    nullable: false,
  })
  user: User;
}
