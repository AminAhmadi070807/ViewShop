import {
  Column,
  Entity,
  JoinColumn,
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

  @ManyToOne((): typeof User => User)
  @JoinColumn({ name: 'user_medias' })
  user: User;

  @OneToMany(() => Category, (category: Category) => category.icon)
  categories: Category[];

  @OneToMany(() => SubCategory, (subCategory: SubCategory) => subCategory.icon)
  subCategories: SubCategory[];

  @OneToMany(() => Attribute, (attribute: Attribute) => attribute.icon)
  attributes: Attribute[];

  @ManyToMany(() => ParentProduct)
  parentProducts: ParentProduct[];

  @ManyToMany(() => Product)
  products: Product[];
}
