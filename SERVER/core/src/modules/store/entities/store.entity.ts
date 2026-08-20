import {
  Column,
  CreateDateColumn,
  Entity,
  JoinColumn,
  JoinTable,
  ManyToMany,
  OneToOne,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';
import { Media } from '../../media/entities/media.entity';
import { Category } from '../../categories/entities/category.entity';
import { StoreStatusEnum } from '../../../common/enums/store/store.enum';

@Entity('Store')
export class Store {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({ type: 'varchar', unique: true, nullable: false })
  title: string;

  @Column({ type: 'varchar', nullable: false })
  description: string;

  @Column({
    type: 'enum',
    enum: StoreStatusEnum,
    default: StoreStatusEnum.WAITING,
  })
  status: StoreStatusEnum;

  @Column({ type: 'varchar', unique: true, nullable: false })
  cell_phone: string;

  @OneToOne((): typeof Media => Media, { nullable: false, onUpdate: 'CASCADE' })
  @JoinColumn({ name: 'Media_Banner_Store' })
  banner: Media;

  @ManyToMany(() => Category)
  @JoinTable({ name: 'Category_Store' })
  categories: Category[];

  @OneToOne(() => Media, { nullable: false })
  @JoinColumn({ name: 'Media_Logo_Store' })
  logo: Media;

  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updatedAt: Date;
}
