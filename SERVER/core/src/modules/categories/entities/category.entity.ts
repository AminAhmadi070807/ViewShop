import {
  Column,
  Entity,
  ManyToOne,
  OneToMany,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { SubCategory } from './sub.category.entity';
import { ParentProduct } from '../../products/entities/parent.product.entity';
import { User } from '../../users/entities/user.entity';
import { Media } from '../../media/entities/media.entity';

@Entity('categories')
export class Category {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({ type: 'varchar', nullable: false })
  title: string;

  @Column({ type: 'varchar', nullable: false })
  link: string;

  @ManyToOne(
    (): typeof Media => Media,
    (media: Media): Category[] => media.categories,
  )
  icon: Media;

  @ManyToOne(() => User, (user: User) => user.categories)
  user: User;

  @OneToMany(
    (): typeof ParentProduct => ParentProduct,
    (product: ParentProduct): Category => product.category,
  )
  parentProduct: ParentProduct[];

  @OneToMany(
    (): typeof SubCategory => SubCategory,
    (subCategory: SubCategory) => subCategory.category,
  )
  subCategories: SubCategory[];
}
