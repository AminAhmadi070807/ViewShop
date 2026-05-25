import { Column, Entity, ManyToOne, PrimaryGeneratedColumn } from 'typeorm';
import {
  ProductApprovalStatusEnum,
  ProductIndexableStatusEnum,
  ProductStatusEnum,
  ProductStockStatusEnum,
  ProductSupplyStatusEnum,
} from '../../../common/enums/products/product/status.enum';
import {
  ProductOwnershipTypeEnum,
  ProductReturnPolicyTypeEnum,
  ProductTaxTypeEnum,
  ProductTypeEnum,
  ProductWarrantyTypeEnum,
} from '../../../common/enums/products/product/type.enum';
import { ProductVisibilityEnum } from '../../../common/enums/products/product/visibility.enum';
import { User } from '../../users/entities/user.entity';

@Entity('products')
export class ParentProduct {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({ type: 'varchar', nullable: false, comment: 'product title' })
  title: string;

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

  // product approval status
  @Column({
    type: 'enum',
    enum: ProductApprovalStatusEnum,
    nullable: false,
    default: ProductApprovalStatusEnum.PENDING,
    comment: 'product approval status',
  })
  approval_status: ProductApprovalStatusEnum;

  // product supply status
  @Column({
    type: 'enum',
    enum: ProductSupplyStatusEnum,
    nullable: false,
    comment: 'product supply status',
  })
  supply_status: ProductSupplyStatusEnum;

  // product indexable status
  @Column({
    type: 'enum',
    enum: ProductIndexableStatusEnum,
    nullable: false,
    comment: 'product indexable status',
    default: ProductIndexableStatusEnum.INDEXABLE,
  })
  indexable_status: ProductIndexableStatusEnum;

  // product type
  @Column({
    type: 'enum',
    enum: ProductTypeEnum,
    nullable: false,
    comment: 'product type',
  })
  product_type: ProductTypeEnum;

  // product ownership type
  @Column({
    type: 'enum',
    enum: ProductOwnershipTypeEnum,
    nullable: false,
    comment: 'product ownership type',
  })
  ownership_type: ProductOwnershipTypeEnum;

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

  // product reserved quantity
  @Column({
    type: 'bigint',
    nullable: false,
    comment: 'product reserved quantity.',
  })
  reserved_quantity: number;

  // product low stock threshold
  @Column({
    type: 'smallint',
    nullable: false,
    comment: 'product low stock threshold.',
  })
  low_stock_threshold: number;

  // product allow backorder
  @Column({
    type: 'boolean',
    nullable: false,
    comment: 'product allow backorder.',
    default: false,
  })
  allow_backorder: boolean;

  // product base price
  @Column({
    type: 'bigint',
    nullable: false,
    comment: 'product base price.',
  })
  base_price: number;

  // product sale price
  @Column({
    type: 'bigint',
    nullable: false,
    comment: 'product sale price.',
  })
  sale_price: number;

  // product minimum price
  @Column({
    type: 'bigint',
    nullable: false,
    comment: 'product minimum price.',
  })
  min_price: number;

  // product maximum price
  @Column({
    type: 'bigint',
    nullable: false,
    comment: 'product maximum price.',
  })
  max_price: number;

  // product final price
  @Column({
    type: 'bigint',
    nullable: false,
    comment: 'product final price type',
  })
  final_price: number;

  // product discount percent
  @Column({
    type: 'smallint',
    nullable: false,
    comment: 'product discount percent type',
    default: 0,
  })
  discount_percent: number;

  // product discount amount
  @Column({
    type: 'bigint',
    nullable: false,
    comment: 'product discount amount type',
    default: 0,
  })
  discount_amount: number;

  @ManyToOne(() => User, (user: User) => user.parentProducts)
  user: User;
}
