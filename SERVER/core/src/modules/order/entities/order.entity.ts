import {
  Column,
  CreateDateColumn,
  Entity,
  JoinColumn,
  ManyToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { Address } from '../../addresses/entities/address.entity';
import { User } from '../../users/entities/user.entity';
import {
  OrderStatusBoxEnum,
  OrderStatusEnum,
} from '../../../common/enums/order/order.status.enum';

@Entity('Order')
export class Order {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @ManyToOne(() => Address, { nullable: false })
  @JoinColumn({ name: 'Address_Order' })
  address: Address;

  @ManyToOne(() => User, { nullable: false })
  @JoinColumn({ name: 'User_Order' })
  user: User;

  @Column({ type: 'simple-json', nullable: false })
  cart: [
    {
      product: string;
      product_detail_id: string;
      price: number;
      quantity: number;
      status: OrderStatusEnum;
    },
  ];

  @Column({
    type: 'enum',
    enum: OrderStatusEnum,
    default: OrderStatusEnum.WAITING,
  })
  status: OrderStatusEnum;

  @Column({
    type: 'enum',
    enum: OrderStatusBoxEnum,
    default: OrderStatusBoxEnum.NONE,
  })
  status_box: OrderStatusBoxEnum;

  @Column({ type: 'bigint', nullable: false })
  price: number;

  @CreateDateColumn()
  createdAt: Date;
}
