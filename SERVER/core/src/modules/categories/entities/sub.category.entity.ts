import {
  Column,
  Entity,
  ManyToOne,
  OneToMany,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { Category } from './category.entity';
import { User } from '../../users/entities/user.entity';
import { Attribute } from './attribute.entity';

@Entity('SubCategories')
export class SubCategory {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({ type: 'varchar', nullable: false })
  title: string;

  @Column({ type: 'varchar', nullable: false })
  icon: string;

  @Column({ type: 'varchar', nullable: false })
  alias: string;

  @ManyToOne(
    (): typeof User => User,
    (user: User): SubCategory[] => user.subCategories,
  )
  user: User;

  @ManyToOne(() => Category, (category: Category) => category.subCategories, {
    nullable: false,
    onUpdate: 'CASCADE',
  })
  category: Category;

  @OneToMany(() => Attribute, (attribute: Attribute) => attribute.subCategory)
  attributes: Attribute[];
}
