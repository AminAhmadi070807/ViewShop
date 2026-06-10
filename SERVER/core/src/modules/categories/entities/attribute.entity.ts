import { Column, Entity, ManyToOne, PrimaryGeneratedColumn } from 'typeorm';
import { SubCategory } from './sub.category.entity';
import { Media } from '../../media/entities/media.entity';
import { User } from '../../users/entities/user.entity';

@Entity('AttributesCategory')
export class Attribute {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({ type: 'varchar', nullable: false })
  title: string;

  @Column({ type: 'varchar', nullable: false })
  alias: string;

  @ManyToOne(
    (): typeof SubCategory => SubCategory,
    (subCategory: SubCategory): Attribute[] => subCategory.attributes,
    {
      onDelete: 'CASCADE',
      onUpdate: 'CASCADE',
      nullable: false,
    },
  )
  subCategory: SubCategory;

  @ManyToOne(
    (): typeof Media => Media,
    (media: Media): Attribute[] => media.attributes,
    {
      onUpdate: 'CASCADE',
      nullable: false,
    },
  )
  icon: Media;

  @ManyToOne(
    (): typeof User => User,
    (user: User): Attribute[] => user.attributes,
    {
      eager: true,
      onUpdate: 'CASCADE',
      nullable: false,
    },
  )
  user: User;
}
