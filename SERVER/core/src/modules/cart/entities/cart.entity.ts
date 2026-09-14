import {
  Column,
  Entity,
  JoinColumn,
  OneToOne,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';
import { User } from '../../users/entities/user.entity';

@Entity('Cart')
export class Cart {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({ nullable: false, type: 'simple-json', onUpdate: 'CASCADE' })
  metadata: [
    {
      product: string;
      product_detail_id: string;
      quantity: number;
      price: number;
    },
  ];

  @Column({ nullable: false, type: 'bigint', default: 0 })
  price: number;

  @OneToOne(() => User, (user: User) => user.cart, { nullable: false })
  @JoinColumn({ name: 'User_Cart' })
  user: User;

  @UpdateDateColumn()
  updatedAt: Date;
}
