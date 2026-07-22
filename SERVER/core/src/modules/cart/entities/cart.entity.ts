import {
  Column,
  Entity,
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
      quantity: number;
      price: number;
    },
  ];

  @Column({ nullable: false, type: 'bigint', default: 0 })
  price: number;

  @OneToOne(() => User, (user: User) => user.cart, { nullable: false })
  user: User;

  @UpdateDateColumn()
  updatedAt: Date;
}
