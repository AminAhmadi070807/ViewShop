import {
  Column,
  CreateDateColumn,
  Entity,
  JoinColumn,
  JoinTable,
  ManyToMany,
  ManyToOne,
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
import { Category } from '../../categories/entities/category.entity';
import { Media } from '../../media/entities/media.entity';
import { SubCategory } from '../../categories/entities/sub.category.entity';
import { Attribute } from '../../categories/entities/attribute.entity';

@Entity('ParentProduct')
export class ParentProduct {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({ type: 'varchar', nullable: false })
  title: string;

  @Column({ type: 'text', nullable: false })
  description: string;

  @Column({ type: 'varchar', nullable: false, unique: true })
  alias: string;

  @Column({
    type: 'enum',
    enum: ProductStatusEnum,
    nullable: false,
    default: ProductStatusEnum.PENDING_APPROVAL,
  })
  status: ProductStatusEnum;

  @Column({ type: 'enum', enum: ProductTypeEnum, nullable: false })
  product_type: ProductTypeEnum;

  @Column({ type: 'smallint', nullable: false })
  tax_percent: number;

  @Column({
    type: 'enum',
    enum: ProductWarrantyTypeEnum,
    nullable: false,
    default: ProductWarrantyTypeEnum.NO_WARRANTY,
  })
  warranty_type: ProductWarrantyTypeEnum;

  @Column({
    type: 'enum',
    enum: ProductReturnPolicyTypeEnum,
    nullable: false,
    default: ProductReturnPolicyTypeEnum.STANDARD,
  })
  return_policy_type: ProductReturnPolicyTypeEnum;

  @Column({
    type: 'enum',
    enum: ProductVisibilityEnum,
    nullable: false,
    default: ProductVisibilityEnum.PRIVATE,
  })
  visibility: ProductVisibilityEnum;

  @Column({ type: 'smallint', nullable: false })
  minimum_quantity: number;

  @Column({ type: 'bigint', nullable: false })
  min_price: number;

  @Column({ type: 'bigint', nullable: false })
  max_price: number;

  @ManyToOne(() => User)
  @JoinColumn({ name: 'User_ParentProduct' })
  user: User;

  @ManyToOne(() => Category, { nullable: false, onUpdate: 'CASCADE' })
  @JoinColumn({ name: 'Category_ParentProduct' })
  category: Category;

  @ManyToOne(() => SubCategory, { nullable: false, onUpdate: 'CASCADE' })
  @JoinColumn({ name: 'SubCategory_ParentProduct' })
  subCategory: SubCategory;

  @ManyToMany(() => Attribute, { nullable: false, onUpdate: 'CASCADE' })
  @JoinTable({ name: 'ParentProduct_Attribute' })
  attributes: Attribute[];

  @ManyToMany(() => Media, { onUpdate: 'CASCADE', nullable: false })
  @JoinTable({ name: 'ParentProduct_Media' })
  medias: Media[];

  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updatedAt: Date;
}
