import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';
import {
  ProductApprovalStatusEnum,
  ProductStatusEnum,
  ProductStockStatusEnum,
  ProductSupplyStatusEnum,
} from '../../../common/enums/products/product/status.enum';
import {
  ProductOwnershipTypeEnum,
  ProductTypeEnum,
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
    comment: 'product approval status',
  })
  supply_status: ProductSupplyStatusEnum;

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
    enum: ProductVisibilityEnum,
    nullable: false,
    default: ProductVisibilityEnum.PUBLIC,
    comment: 'product visibility',
  })
  visibility: ProductVisibilityEnum;
}
