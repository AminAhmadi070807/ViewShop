import { Column, Entity, ManyToOne, PrimaryGeneratedColumn } from 'typeorm';
import { SubCategory } from './sub.category.entity';

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
}
