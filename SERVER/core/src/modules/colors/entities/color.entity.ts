import {
  Column,
  CreateDateColumn,
  Entity,
  JoinColumn,
  ManyToOne,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';
import { Media } from '../../media/entities/media.entity';

@Entity('Color')
export class Color {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({ type: 'varchar', nullable: false, unique: true })
  color: string;

  @Column({ type: 'varchar', nullable: false })
  title: string;

  @ManyToOne(() => Media)
  @JoinColumn({ name: 'Media_Color' })
  media: Media;

  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updatedAt: Date;
}
