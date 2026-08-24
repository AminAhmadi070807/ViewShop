import {
  Column,
  CreateDateColumn,
  Entity,
  JoinColumn,
  JoinTable,
  ManyToMany,
  ManyToOne,
  OneToOne,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';
import {
  ProductApprovalStatusEnum,
  ProductStatusEnum,
  ProductStockStatusEnum,
} from '../../../common/enums/products/product/status.enum';
import { User } from '../../users/entities/user.entity';
import { Media } from '../../media/entities/media.entity';
import { Store } from '../../store/entities/store.entity';
import { Brand } from '../../brands/entities/brand.entity';

@Entity('Product')
export class Product {
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

  @Column({ type: 'jsonb', nullable: false })
  details: { id: string; color: string; price: number; stock: number }[];

  @Column({ type: 'integer', nullable: false, default: 0 })
  discount_percent: number;

  @ManyToOne(() => User)
  @JoinColumn({ name: 'User_Product' })
  user: User;

  @ManyToMany(() => Media, { nullable: false })
  @JoinTable({ name: 'Media_Product' })
  medias: Media[];

  @ManyToOne(() => Store, { nullable: false, onUpdate: 'CASCADE' })
  @JoinColumn({ name: 'Store_Product' })
  store: Store;

  @Column({ type: 'jsonb', nullable: false })
  filters: {
    id: string;
    details: { id: string; title: string; value: string };
  }[];

  @OneToOne(() => Brand, { nullable: false })
  @JoinColumn({ name: 'Brand_Product' })
  brand: Brand;

  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updatedAt: Date;
}
