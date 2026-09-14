import {
  Column,
  CreateDateColumn,
  Entity,
  JoinColumn,
  ManyToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { Product } from '../../products/entities/product.entity';
import { Store } from '../../store/entities/store.entity';
import { OrderStatusBoxEnum } from '../../../common/enums/order/order.status.enum';

@Entity('Sales')
export class Sale {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @ManyToOne(() => Product, { nullable: false })
  @JoinColumn({ name: 'Product_Sales' })
  product: Product;

  @ManyToOne(() => Store, { nullable: false })
  @JoinColumn({ name: 'Store_Sales' })
  store: Store;

  @Column({ type: 'uuid', nullable: false })
  product_detail_id: string;

  @Column({ type: 'bigint', nullable: false })
  price: number;

  @Column({ type: 'bigint', nullable: false })
  product_price: number;

  @Column({ type: 'smallint', nullable: false })
  quantity: number;

  @Column({
    type: 'enum',
    enum: OrderStatusBoxEnum,
    default: OrderStatusBoxEnum.PENDING,
  })
  status: OrderStatusBoxEnum;

  @CreateDateColumn()
  createdAt: Date;
}
