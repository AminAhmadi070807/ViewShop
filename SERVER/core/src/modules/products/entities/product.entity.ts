import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';
import {
  ProductApprovalStatusEnum,
  ProductStatusEnum,
  ProductStockStatusEnum,
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

  @Column({ type: 'varchar', nullable: false })
  title: string;

  @Column({ type: 'varchar', nullable: false, unique: true })
  alias: string;

  @Column({ type: 'text', nullable: false })
  description: string;

  @Column({ type: 'varchar', nullable: false })
  short_description: string;

  @Column({
    type: 'enum',
    enum: ProductStatusEnum,
    nullable: false,
    default: ProductStatusEnum.PENDING_APPROVAL,
  })
  status: ProductStatusEnum;

  @Column({
    type: 'enum',
    enum: ProductStockStatusEnum,
    nullable: false,
    default: ProductStockStatusEnum.IN_STOCK,
  })
  stock_status: ProductStockStatusEnum;

  @Column({
    type: 'enum',
    enum: ProductApprovalStatusEnum,
    nullable: false,
    default: ProductApprovalStatusEnum.PENDING,
  })
  approval_status: ProductApprovalStatusEnum;

  @Column({ type: 'enum', enum: ProductTypeEnum, nullable: false })
  product_type: ProductTypeEnum;

  @Column({ type: 'enum', enum: ProductOwnershipTypeEnum, nullable: false })
  ownership_type: ProductOwnershipTypeEnum;

  @Column({
    type: 'enum',
    enum: ProductVisibilityEnum,
    nullable: false,
    default: ProductVisibilityEnum.PUBLIC,
  })
  visibility: ProductVisibilityEnum;
}
