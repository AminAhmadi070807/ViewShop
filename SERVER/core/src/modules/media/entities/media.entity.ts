import {
  Column,
  Entity,
  JoinColumn,
  ManyToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { User } from '../../users/entities/user.entity';
import { MediaTypeEnum } from '../../../common/enums/media/media.enum';

@Entity('Media')
export class Media {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({ type: 'varchar', nullable: false })
  title: string;

  @Column({ type: 'varchar', nullable: false, unique: true })
  path: string;

  @Column({ type: 'enum', enum: MediaTypeEnum, default: MediaTypeEnum.PUBLIC })
  type: MediaTypeEnum;

  @ManyToOne((): typeof User => User)
  @JoinColumn({ name: 'User_Media' })
  user: User;
}
