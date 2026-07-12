import {
  Column,
  CreateDateColumn,
  Entity,
  OneToMany,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';
import { UserRoleEnum } from '../../../common/enums/users/user.enum';
import { Auth } from '../../auth/entities/auth.entity';
import { Address } from '../../addresses/entities/address.entity';
import { ParentProduct } from '../../products/entities/parent.product.entity';
import { Product } from '../../products/entities/product.entity';
import { Category } from '../../categories/entities/category.entity';
import { SubCategory } from '../../categories/entities/sub.category.entity';
import { Media } from '../../media/entities/media.entity';
import { Attribute } from '../../categories/entities/attribute.entity';
import { Ticket } from '../../tickets/entities/ticket.entity';
import { Payment } from '../../payment/entities/payment.entity';

@Entity('users')
export class User {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({ type: 'varchar', length: 11, unique: true, nullable: false })
  phone: string;

  @Column({ type: 'varchar', nullable: false })
  password: string;

  @Column({ type: 'varchar', nullable: true, length: 50 })
  fullName: string;

  @Column({
    type: 'enum',
    enum: UserRoleEnum,
    default: UserRoleEnum.USER,
    nullable: false,
  })
  role: UserRoleEnum;

  @Column({ type: 'boolean', nullable: false, default: false })
  verified: boolean;

  @OneToMany(() => Auth, (auth: Auth) => auth.user, {
    onUpdate: 'CASCADE',
    nullable: false,
  })
  tokens: Auth[];

  @OneToMany(() => Address, (address: Address) => address.user)
  addresses: Address[];

  @OneToMany(
    (): typeof ParentProduct => ParentProduct,
    (parentProduct: ParentProduct): User => parentProduct.user,
  )
  parentProducts: ParentProduct[];

  @OneToMany(
    (): typeof Product => Product,
    (product: Product): User => product.user,
  )
  products: Product[];

  @OneToMany(
    (): typeof Category => Category,
    (category: Category): User => category.user,
  )
  categories: Category[];

  @OneToMany(
    (): typeof SubCategory => SubCategory,
    (subCategory: SubCategory): User => subCategory.user,
  )
  subCategories: SubCategory[];

  @OneToMany(
    (): typeof Attribute => Attribute,
    (attribute: Attribute): User => attribute.user,
  )
  attributes: Attribute[];

  @OneToMany((): typeof Ticket => Ticket, (ticket: Ticket): User => ticket.user)
  tickets: Ticket[];

  @OneToMany(() => Media, (media: Media) => media.user)
  medias: Media[];

  @OneToMany(() => Payment, (payment: Payment) => payment.user)
  payments: Payment[];

  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updatedAt: Date;
}
