import {
  Column,
  CreateDateColumn,
  Entity,
  JoinTable,
  ManyToMany,
  ManyToOne,
  OneToMany,
  OneToOne,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';
import { ProductStatusEnum } from '../../../common/enums/products/product/status.enum';
import {
  ProductReturnPolicyTypeEnum,
  ProductTypeEnum,
  ProductWarrantyTypeEnum,
} from '../../../common/enums/products/product/type.enum';
import { ProductVisibilityEnum } from '../../../common/enums/products/product/visibility.enum';
import { User } from '../../users/entities/user.entity';
import { Product } from './product.entity';
import { Category } from '../../categories/entities/category.entity';
import { Media } from '../../media/entities/media.entity';
import { SubCategory } from '../../categories/entities/sub.category.entity';
import { Attribute } from '../../categories/entities/attribute.entity';

@Entity('parentProducts')
export class ParentProduct {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({ type: 'varchar', nullable: false, comment: 'product title' })
  title: string;

  @Column({ type: 'text', nullable: false, comment: 'product description' })
  description: string;

  @Column({
    type: 'varchar',
    nullable: false,
    unique: true,
    comment: 'product alias name',
  })
  alias: string;

  // product status
  @Column({
    type: 'enum',
    enum: ProductStatusEnum,
    nullable: false,
    default: ProductStatusEnum.PENDING_APPROVAL,
    comment: 'product status',
  })
  status: ProductStatusEnum;

  // product type
  @Column({
    type: 'enum',
    enum: ProductTypeEnum,
    nullable: false,
    comment: 'product type',
  })
  product_type: ProductTypeEnum;

  // product tax amount
  @Column({
    type: 'integer',
    nullable: false,
    comment: 'product tax type',
  })
  tax_percent: number;

  // product warranty type
  @Column({
    type: 'enum',
    enum: ProductWarrantyTypeEnum,
    nullable: false,
    default: ProductWarrantyTypeEnum.NO_WARRANTY,
    comment: 'product warranty type',
  })
  warranty_type: ProductWarrantyTypeEnum;

  // product return policy type
  @Column({
    type: 'enum',
    enum: ProductReturnPolicyTypeEnum,
    nullable: false,
    default: ProductReturnPolicyTypeEnum.STANDARD,
    comment: 'product policy type',
  })
  return_policy_type: ProductReturnPolicyTypeEnum;

  // product visibility
  @Column({
    type: 'enum',
    enum: ProductVisibilityEnum,
    nullable: false,
    default: ProductVisibilityEnum.PRIVATE,
    comment: 'product visibility',
  })
  visibility: ProductVisibilityEnum;

  // product minimum quantity
  @Column({
    type: 'smallint',
    nullable: false,
    comment: 'product minimum quantity.',
  })
  minimum_quantity: number;

  // product min price
  @Column({
    type: 'bigint',
    nullable: false,
    comment: 'product min price type',
  })
  min_price: number;

  // product max price
  @Column({
    type: 'bigint',
    nullable: false,
    comment: 'product max price type',
  })
  max_price: number;

  @ManyToOne(
    (): typeof User => User,
    (user: User): ParentProduct[] => user.parentProducts,
  )
  user: User;

  @ManyToOne(
    (): typeof Category => Category,
    (category: Category) => category.parentProduct,
    {
      nullable: false,
      onUpdate: 'CASCADE',
    },
  )
  category: Category;

  @ManyToOne(
    (): typeof SubCategory => SubCategory,
    (sub: SubCategory) => sub.parentProduct,
    {
      nullable: false,
      onUpdate: 'CASCADE',
    },
  )
  subCategory: SubCategory;

  @ManyToMany(
    (): typeof Attribute => Attribute,
    (attr: Attribute) => attr.parentProducts,
    {
      nullable: false,
      onUpdate: 'CASCADE',
    },
  )
  @JoinTable({
    name: 'parentProducts_attributes',
    joinColumn: { name: 'user_id' },
    inverseJoinColumn: { name: 'role_id' },
  })
  attributes: Attribute[];

  @OneToMany(() => Product, (product: Product) => product.parentProduct)
  products: Product[];

  @ManyToMany(
    (): typeof Media => Media,
    (media: Media): ParentProduct[] => media.parentProducts,
    {
      onUpdate: 'CASCADE',
      nullable: false,
      eager: true,
    },
  )
  @JoinTable({
    name: 'parentProducts_medias',
    joinColumn: { name: 'product_id' },
    inverseJoinColumn: { name: 'media_id' },
  })
  medias: Media[];

  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updatedAt: Date;
}
