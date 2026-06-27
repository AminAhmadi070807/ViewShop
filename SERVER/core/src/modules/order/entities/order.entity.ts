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
      productId: string;
      price: number;
      quantity: number;
    },
  ];

  @Column({ type: 'smallint', nullable: false })
  price: number;

  @CreateDateColumn()
  createdAt: Date;
}
