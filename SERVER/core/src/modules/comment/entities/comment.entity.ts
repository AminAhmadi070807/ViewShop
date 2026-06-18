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

@Entity('comments')
export class Comment {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({ type: 'varchar', nullable: false })
  description: string;

  @Column({ type: 'smallint', nullable: false, default: 5 })
  score: number;

  @ManyToOne(() => Product, (product: Product) => product.comments, {
    nullable: false,
  })
  product: Product;

  @ManyToOne(() => User, { nullable: false })
  @JoinColumn({
    name: 'comments_user',
  })
  user: User;

  @ManyToOne(() => Comment, { nullable: true })
  parentComment: Comment;

  @Column({ type: 'boolean', nullable: false, default: false })
  status: boolean;

  @CreateDateColumn()
  createdAt: Date;
}
