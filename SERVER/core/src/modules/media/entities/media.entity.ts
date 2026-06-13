import {
  Column,
  Entity,
  ManyToMany,
  ManyToOne,
  OneToMany,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { User } from '../../users/entities/user.entity';
import { ParentProduct } from '../../products/entities/parent.product.entity';
import { Category } from '../../categories/entities/category.entity';
import { SubCategory } from '../../categories/entities/sub.category.entity';
import { Attribute } from '../../categories/entities/attribute.entity';
import { Product } from '../../products/entities/product.entity';

@Entity('media')
export class Media {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({ type: 'varchar', nullable: false })
  title: string;

  @Column({ type: 'varchar', nullable: false, unique: true })
  path: string;

  @ManyToOne((): typeof User => User, (user: User): Media[] => user.medias)
  user: User;

  @OneToMany(
    (): typeof Category => Category,
    (category: Category): Media => category.icon,
    {
      onUpdate: 'CASCADE',
    },
  )
  categories: Category[];

  @OneToMany(
    (): typeof SubCategory => SubCategory,
    (subCategory: SubCategory): Media => subCategory.icon,
    {
      onUpdate: 'CASCADE',
    },
  )
  subCategories: SubCategory[];

  @OneToMany(
    (): typeof Attribute => Attribute,
    (attribute: Attribute): Media => attribute.icon,
    {
      onUpdate: 'CASCADE',
    },
  )
  attributes: Attribute[];

  @ManyToMany(() => ParentProduct, (product: ParentProduct) => product.medias)
  parentProducts: ParentProduct[];

  @ManyToMany(() => Product, (product: Product) => product.medias)
  products: Product[];
}
