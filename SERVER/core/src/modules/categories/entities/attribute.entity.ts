import {
  Column,
  Entity,
  ManyToMany,
  ManyToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { SubCategory } from './sub.category.entity';
import { Media } from '../../media/entities/media.entity';
import { User } from '../../users/entities/user.entity';
import { ParentProduct } from '../../products/entities/parent.product.entity';
import { ParentProductDto } from '../../products/dto/parent.product.dto';

@Entity('AttributesCategory')
export class Attribute {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({ type: 'varchar', nullable: false })
  title: string;

  @Column({ type: 'varchar', nullable: false })
  alias: string;

  @ManyToOne(
    (): typeof SubCategory => SubCategory,
    (subCategory: SubCategory): Attribute[] => subCategory.attributes,
    {
      onDelete: 'CASCADE',
      onUpdate: 'CASCADE',
      nullable: false,
    },
  )
  subCategory: SubCategory;

  @ManyToMany(
    (): typeof ParentProduct => ParentProduct,
    (product: ParentProduct): Attribute[] => product.attributes,
    {
      onDelete: 'CASCADE',
      onUpdate: 'CASCADE',
      nullable: false,
    },
  )
  parentProducts: ParentProduct[];

  @ManyToOne(
    (): typeof Media => Media,
    (media: Media): Attribute[] => media.attributes,
    {
      onUpdate: 'CASCADE',
      nullable: false,
    },
  )
  icon: Media;

  @ManyToOne(
    (): typeof User => User,
    (user: User): Attribute[] => user.attributes,
    {
      eager: true,
      onUpdate: 'CASCADE',
      nullable: false,
    },
  )
  user: User;
}
