import {
  Column,
  CreateDateColumn,
  Entity,
  JoinColumn,
  ManyToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { Product } from '../../products/entities/product.entity';
import { User } from '../../users/entities/user.entity';

@Entity('Comment')
export class Comment {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({ type: 'varchar', nullable: false })
  description: string;

  @Column({ type: 'smallint', nullable: false, default: 5 })
  score: number;

  @Column({ type: 'uuid', nullable: true })
  parentComment: string;

  @ManyToOne(() => Product, { nullable: false })
  @JoinColumn({ name: 'Product_Comment' })
  product: Product;

  @ManyToOne(() => User, { nullable: false })
  @JoinColumn({ name: 'User_Comment' })
  user: User;

  @Column({ type: 'boolean', nullable: false, default: false })
  status: boolean;

  @CreateDateColumn()
  createdAt: Date;
}
