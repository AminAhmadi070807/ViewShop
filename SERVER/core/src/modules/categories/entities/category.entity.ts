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
  alias: string;

  @ManyToOne(
    (): typeof Media => Media,
    (media: Media): Category[] => media.categories,
    {
      eager: true,
      onUpdate: 'CASCADE',
      nullable: false,
    },
  )
  icon: Media;

  @ManyToOne(() => User, (user: User) => user.categories, {
    nullable: false,
    onUpdate: 'CASCADE',
  })
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
