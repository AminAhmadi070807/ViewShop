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
import { OrderStatusEnum } from '../../../common/enums/order/order.status.enum';

@Entity('orders')
export class Order {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @ManyToOne(() => Address, { eager: true, nullable: false })
  @JoinColumn()
  address: Address;

  @ManyToOne(() => User, { nullable: false })
  @JoinColumn()
  user: User;

  @Column({ type: 'simple-json', nullable: false })
  cart: [
    {
      product: string;
      price: number;
      quantity: number;
    },
  ];

  @Column({
    type: 'enum',
    enum: OrderStatusEnum,
    default: OrderStatusEnum.PENDING,
  })
  status: OrderStatusEnum;

  @Column({ type: 'smallint', nullable: false })
  price: number;

  @CreateDateColumn()
  createdAt: Date;
}
