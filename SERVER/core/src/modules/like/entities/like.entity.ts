import {
  CreateDateColumn,
  Entity,
  JoinColumn,
  ManyToOne,
  OneToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { Product } from '../../products/entities/product.entity';
import { User } from '../../users/entities/user.entity';

@Entity('like')
export class Like {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @OneToOne(() => Product, {
    nullable: false,
    onDelete: 'CASCADE',
    onUpdate: 'CASCADE',
  })
  @JoinColumn()
  product: Product;

  @ManyToOne(() => User, {
    nullable: false,
    onDelete: 'CASCADE',
    onUpdate: 'CASCADE',
  })
  @JoinColumn({ name: 'user_like' })
  user: User;

  @CreateDateColumn()
  createdAt: Date;
}
