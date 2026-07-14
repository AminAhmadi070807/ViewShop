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
import {
  ProductApprovalStatusEnum,
  ProductStatusEnum,
  ProductStockStatusEnum,
} from '../../../common/enums/products/product/status.enum';
import { User } from '../../users/entities/user.entity';
import { ParentProduct } from './parent.product.entity';
import { Media } from '../../media/entities/media.entity';
import { Store } from '../../store/entities/store.entity';

@Entity('Product')
export class Product {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({ type: 'varchar', nullable: false, unique: true })
  alias: string;

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

  @Column({ type: 'integer', nullable: false })
  price: number;

  @Column({ type: 'integer', nullable: false, default: 0 })
  discount_percent: number;

  @ManyToOne(() => User)
  @JoinColumn({ name: 'User_Product' })
  user: User;

  @ManyToOne(() => ParentProduct, { nullable: false })
  @JoinColumn({ name: 'Product_ParentProduct' })
  parentProduct: ParentProduct;

  @ManyToMany(() => Media, { nullable: false })
  @JoinTable({ name: 'Media_Product' })
  medias: Media[];

  @ManyToOne(() => Store, { nullable: false, onUpdate: 'CASCADE' })
  @JoinTable({ name: 'Store_Product' })
  store: Store;

  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updatedAt: Date;
}
