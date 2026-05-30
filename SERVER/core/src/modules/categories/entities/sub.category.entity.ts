import { Column, Entity, ManyToOne, PrimaryGeneratedColumn } from 'typeorm';
import { User } from '../../users/entities/user.entity';
import { Category } from './category.entity';

@Entity('subCategories')
export class SubCategory {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({ type: 'varchar', nullable: false })
  title: string;

  @Column({ type: 'varchar', nullable: false })
  icon: string;

  @Column({ type: 'varchar', nullable: false })
  link: string;

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
}
