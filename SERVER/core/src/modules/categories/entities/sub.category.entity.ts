import {
  Column,
  Entity,
  JoinColumn,
  ManyToOne,
  OneToMany,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { Category } from './category.entity';
import { User } from '../../users/entities/user.entity';
import { Attribute } from './attribute.entity';
import { Media } from '../../media/entities/media.entity';
import { ParentProduct } from '../../products/entities/parent.product.entity';

@Entity('SubCategories')
export class SubCategory {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({ type: 'varchar', nullable: false })
  title: string;

  @ManyToOne((): typeof Media => Media, {
    eager: true,
    onUpdate: 'CASCADE',
    nullable: false,
  })
  @JoinColumn({ name: 'media_icon' })
  icon: Media;

  @Column({ type: 'varchar', nullable: false })
  alias: string;

  @ManyToOne(() => User)
  @JoinColumn({ name: 'user_sub_category' })
  user: User;

  @ManyToOne(() => Category, {
    nullable: false,
    onUpdate: 'CASCADE',
  })
  @JoinColumn({ name: 'category_sub_category' })
  category: Category;

  @OneToMany(
    () => ParentProduct,
    (product: ParentProduct) => product.subCategory,
    {
      nullable: false,
      onUpdate: 'CASCADE',
    },
  )
  parentProduct: ParentProduct;

  @OneToMany(() => Attribute, (attribute: Attribute) => attribute)
  attributes: Attribute[];
}
