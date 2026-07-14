import {
  Column,
  CreateDateColumn,
  Entity,
  PrimaryGeneratedColumn,
} from 'typeorm';

@Entity('Search')
export class Search {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({ type: 'varchar', nullable: false, unique: true })
  search: string;

  @Column({ type: 'smallint', nullable: false, default: 0 })
  numberOfSearch: number;

  @CreateDateColumn()
  createdAt: Date;
}
