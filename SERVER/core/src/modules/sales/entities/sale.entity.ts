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

@Entity('Sales')
export class Sale {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @ManyToOne(() => Product, { nullable: false })
  @JoinColumn({ name: 'Product_Sales' })
  product: Product;

  @ManyToOne(() => Product, { nullable: false })
  @JoinColumn({ name: 'Store_Sales' })
  store: Store;

  @Column({ type: 'uuid', nullable: false })
  product_detail_id: string;

  @Column({ type: 'bigint', nullable: false })
  price: number;

  @CreateDateColumn()
  createdAt: Date;
}
