import {
  Column,
  Entity,
  ManyToOne,
  OneToMany,
  OneToOne,
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

  @Column({ type: 'varchar', nullable: false })
  alias: string;

  @ManyToOne(
    (): typeof User => User,
    (user: User): SubCategory[] => user.subCategories,
  )
  user: User;

  @ManyToOne(() => Category, (category: Category) => category.subCategories, {
    nullable: false,
    onUpdate: 'CASCADE',
  })
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

  @OneToMany(() => Attribute, (attribute: Attribute) => attribute.subCategory)
  attributes: Attribute[];
}
