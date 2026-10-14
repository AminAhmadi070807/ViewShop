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
import { Media } from '../../media/entities/media.entity';
import { Store } from '../../store/entities/store.entity';
import { Brand } from '../../brands/entities/brand.entity';
import { Specification } from '../../specification/entities/specification.entity';

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
    default: ProductStatusEnum.PENDING_APPROVAL,
  })
  status: ProductStatusEnum;

  @Column({
    type: 'enum',
    enum: ProductStockStatusEnum,
    default: ProductStockStatusEnum.IN_STOCK,
  })
  stock_status: ProductStockStatusEnum;

  @Column({
    type: 'enum',
    enum: ProductApprovalStatusEnum,
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

  @ManyToOne(() => Brand, { nullable: false })
  @JoinColumn({ name: 'Brand_Product' })
  brand: Brand;

  @ManyToOne(() => Specification, { nullable: false })
  @JoinColumn({ name: 'Product_Specification' })
  specification: Specification;

  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updatedAt: Date;
}
