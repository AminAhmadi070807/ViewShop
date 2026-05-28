import {
  Column,
  CreateDateColumn,
  Entity,
  ManyToOne,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';
import {
  ProductApprovalStatusEnum,
  ProductStatusEnum,
  ProductStockStatusEnum,
} from '../../../common/enums/products/product/status.enum';
import { User } from '../../users/entities/user.entity';
import { ParentProduct } from './parent.product.entity';

@Entity('products')
export class Product {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({
    type: 'varchar',
    nullable: false,
    unique: true,
    comment: 'product alias name',
  })
  alias: string;

  @Column({
    type: 'varchar',
    array: true,
    nullable: false,
    comment: 'product images',
  })
  images: string[];

  @Column({ type: 'varchar', nullable: false, comment: 'product video' })
  video: string;

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

  // product approval status
  @Column({
    type: 'enum',
    enum: ProductApprovalStatusEnum,
    nullable: false,
    default: ProductApprovalStatusEnum.PENDING,
    comment: 'product approval status',
  })
  approval_status: ProductApprovalStatusEnum;

  // product price
  @Column({
    type: 'integer',
    nullable: false,
    comment: 'product price type',
  })
  price: number;

  // product discount amount
  @Column({
    type: 'integer',
    nullable: false,
    comment: 'product discount amount type',
    default: 0,
  })
  discount_amount: number;

  @ManyToOne(() => User, (user: User) => user.products)
  user: User;

  @ManyToOne(() => ParentProduct, (product: ParentProduct) => product.products)
  parent_product: ParentProduct;

  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updatedAt: Date;
}
