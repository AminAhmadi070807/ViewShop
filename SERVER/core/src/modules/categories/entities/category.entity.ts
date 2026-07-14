import {
  Column,
  Entity,
  JoinColumn,
  ManyToMany,
  ManyToOne,
  OneToMany,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { SubCategory } from './sub.category.entity';
import { ParentProduct } from '../../products/entities/parent.product.entity';
import { User } from '../../users/entities/user.entity';
import { Media } from '../../media/entities/media.entity';
import { Store } from '../../store/entities/store.entity';

@Entity('categories')
export class Category {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({ type: 'varchar', nullable: false })
  title: string;

  @Column({ type: 'varchar', nullable: false })
  alias: string;

  @ManyToOne(() => Media, (media: Media): Category[] => media.categories, {
    eager: true,
    onUpdate: 'CASCADE',
    nullable: false,
  })
  icon: Media;

  @ManyToOne(() => User, {
    nullable: false,
    onUpdate: 'CASCADE',
  })
  @JoinColumn({ name: 'user_category' })
  user: User;

  @OneToMany(() => ParentProduct, (product: ParentProduct) => product.category)
  parentProduct: ParentProduct[];

  @OneToMany(
    () => SubCategory,
    (subCategory: SubCategory) => subCategory.category,
  )
  subCategories: SubCategory[];

  @ManyToMany(() => Store, (store: Store) => store.categories)
  stores: Store[];
}
