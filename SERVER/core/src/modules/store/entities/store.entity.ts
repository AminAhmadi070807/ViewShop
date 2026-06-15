import {
  Column,
  CreateDateColumn,
  Entity,
  JoinColumn,
  JoinTable,
  ManyToMany,
  OneToMany,
  OneToOne,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';
import { Media } from '../../media/entities/media.entity';
import { Category } from '../../categories/entities/category.entity';
import { Product } from '../../products/entities/product.entity';
import { StoreStatusEnum } from '../../../common/enums/store/store.enum';
import { User } from '../../users/entities/user.entity';

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

  @Column({
    type: 'enum',
    enum: StoreStatusEnum,
    default: StoreStatusEnum.WAITING,
  })
  status: StoreStatusEnum;

  @OneToOne((): typeof Media => Media, { nullable: false, onUpdate: 'CASCADE' })
  @JoinColumn()
  logo: Media;

  @OneToOne((): typeof User => User, { nullable: false, onUpdate: 'CASCADE' })
  @JoinColumn()
  owner: User;

  @OneToOne((): typeof Media => Media, { nullable: false, onUpdate: 'CASCADE' })
  @JoinColumn()
  banner: Media;

  @ManyToMany(() => Category, (category: Category) => category.stores)
  @JoinTable({
    name: 'stores_categories',
    joinColumn: { name: 'store_id' },
    inverseJoinColumn: { name: 'category_id' },
  })
  categories: Category[];

  @OneToMany(() => Product, (product: Product) => product.store)
  products: Product[];

  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updatedAt: Date;
}
