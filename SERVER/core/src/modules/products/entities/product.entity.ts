import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';
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

@Entity('products')
export class Product {
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

  @Column({ type: 'text', nullable: false, comment: 'product description' })
  description: string;

  @Column({
    type: 'varchar',
    nullable: false,
    comment: 'product short description',
  })
  short_description: string;

  @Column({
    type: 'enum',
    enum: ProductStatusEnum,
    nullable: false,
    default: ProductStatusEnum.PENDING_APPROVAL,
    comment: 'product status',
  })
  status: ProductStatusEnum;

  @Column({
    type: 'enum',
    enum: ProductStockStatusEnum,
    nullable: false,
    default: ProductStockStatusEnum.IN_STOCK,
    comment: 'product stock status',
  })
  stock_status: ProductStockStatusEnum;

  @Column({
    type: 'enum',
    enum: ProductApprovalStatusEnum,
    nullable: false,
    default: ProductApprovalStatusEnum.PENDING,
    comment: 'product approval status',
  })
  approval_status: ProductApprovalStatusEnum;

  @Column({
    type: 'enum',
    enum: ProductSupplyStatusEnum,
    nullable: false,
    comment: 'product supply status',
  })
  supply_status: ProductSupplyStatusEnum;

  @Column({
    type: 'enum',
    enum: ProductIndexableStatusEnum,
    nullable: false,
    comment: 'product indexable status',
    default: ProductIndexableStatusEnum.INDEXABLE,
  })
  indexable_status: ProductIndexableStatusEnum;

  @Column({
    type: 'enum',
    enum: ProductTypeEnum,
    nullable: false,
    comment: 'product type',
  })
  product_type: ProductTypeEnum;

  @Column({
    type: 'enum',
    enum: ProductOwnershipTypeEnum,
    nullable: false,
    comment: 'product ownership type',
  })
  ownership_type: ProductOwnershipTypeEnum;

  @Column({
    type: 'enum',
    enum: ProductTaxTypeEnum,
    nullable: false,
    default: ProductTaxTypeEnum.PERCENTAGE,
    comment: 'product tax type',
  })
  tax_type: ProductTaxTypeEnum;

  @Column({
    type: 'enum',
    enum: ProductWarrantyTypeEnum,
    nullable: false,
    default: ProductWarrantyTypeEnum.NO_WARRANTY,
    comment: 'product warranty type',
  })
  warranty_type: ProductWarrantyTypeEnum;

  @Column({
    type: 'enum',
    enum: ProductReturnPolicyTypeEnum,
    nullable: false,
    default: ProductReturnPolicyTypeEnum.STANDARD,
    comment: 'product policy type',
  })
  return_policy_type: ProductReturnPolicyTypeEnum;

  @Column({
    type: 'enum',
    enum: ProductVisibilityEnum,
    nullable: false,
    default: ProductVisibilityEnum.PUBLIC,
    comment: 'product visibility',
  })
  visibility: ProductVisibilityEnum;
}
