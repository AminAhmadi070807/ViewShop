import {
  Column,
  CreateDateColumn,
  Entity,
  ManyToMany,
  OneToMany,
  OneToOne,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';
import { Media } from '../../media/entities/media.entity';
import { Category } from '../../categories/entities/category.entity';
import { Product } from '../../products/entities/product.entity';

@Entity('stores')
export class Store {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({ type: 'varchar', unique: true, nullable: false })
  title: string;

  @Column({ type: 'varchar', unique: true, nullable: false })
  alias: string;

  @Column({ type: 'varchar', nullable: false })
  description: string;

  @Column({ type: 'varchar', nullable: false })
  fullName: string;

  @OneToOne((): typeof Media => Media, { nullable: false, onUpdate: 'CASCADE' })
  logo: Media;

  @OneToOne((): typeof Media => Media, { nullable: false, onUpdate: 'CASCADE' })
  banner: Media;

  @ManyToMany(() => Category, (category: Category) => category.stores)
  categories: Category[];

  @OneToMany(() => Product, (product: Product) => product.store)
  products: Product[];

  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updatedAt: Date;
}
