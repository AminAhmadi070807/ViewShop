import {
  Column,
  Entity,
  ManyToMany,
  ManyToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { User } from '../../users/entities/user.entity';
import { ParentProduct } from '../../products/entities/parent.product.entity';
import { Category } from '../../categories/entities/category.entity';

@Entity('media')
export class Media {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({ type: 'varchar', nullable: false })
  title: string;

  @Column({ type: 'varchar', nullable: false, unique: true })
  path: string;

  @ManyToOne((): typeof User => User, (user: User): Media[] => user.medias)
  user: User;

  @ManyToOne(() => Category, (category: Category) => category.icon)
  categories: Category[];

  @ManyToMany(() => ParentProduct, (product: ParentProduct) => product.medias)
  parentProducts: ParentProduct[];
}
