import {
  Column,
  CreateDateColumn,
  Entity,
  ManyToOne,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';
import {
  ProductStatusEnum,
  ProductStockStatusEnum,
} from '../../../common/enums/products/product/status.enum';
import {
  ProductReturnPolicyTypeEnum,
  ProductTaxTypeEnum,
  ProductTypeEnum,
  ProductWarrantyTypeEnum,
} from '../../../common/enums/products/product/type.enum';
import { ProductVisibilityEnum } from '../../../common/enums/products/product/visibility.enum';
import { User } from '../../users/entities/user.entity';

@Entity('parent_products')
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

  // product stock status
  @Column({
    type: 'enum',
    enum: ProductStockStatusEnum,
    nullable: false,
    default: ProductStockStatusEnum.IN_STOCK,
    comment: 'product stock status',
  })
  stock_status: ProductStockStatusEnum;

  // product stock quantity
  @Column({
    type: 'smallint',
    nullable: false,
    comment: 'product stock quantity',
  })
  stock_quantity: number;

  // product type
  @Column({
    type: 'enum',
    enum: ProductTypeEnum,
    nullable: false,
    comment: 'product type',
  })
  product_type: ProductTypeEnum;

  // product tax type
  @Column({
    type: 'enum',
    enum: ProductTaxTypeEnum,
    nullable: false,
    default: ProductTaxTypeEnum.PERCENTAGE,
    comment: 'product tax type',
  })
  tax_type: ProductTaxTypeEnum;

  // product tax amount
  @Column({
    type: 'bigint',
    nullable: false,
    comment: 'product tax type',
  })
  tax_amount: number;

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
    default: ProductVisibilityEnum.PUBLIC,
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

  // product maximum quantity
  @Column({
    type: 'bigint',
    nullable: false,
    comment: 'product maximum quantity.',
  })
  maximum_quantity: number;

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

  @ManyToOne(() => User, (user: User) => user.products)
  user: User;

  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updatedAt: Date;
}
