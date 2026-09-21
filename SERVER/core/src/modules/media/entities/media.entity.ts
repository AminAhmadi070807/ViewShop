import {
  Column,
  Entity,
  JoinColumn,
  ManyToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { MediaTypeEnum } from '../../../common/enums/media/media.enum';
import { User } from '../../users/entities/user.entity';

@Entity('Media')
export class Media {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({ type: 'varchar', nullable: false })
  title: string;

  @Column({ type: 'varchar', nullable: false, unique: true })
  path: string;

  @ManyToOne((): typeof User => User)
  @JoinColumn({ name: 'User_Media' })
  user: User;

  @Column({ type: 'enum', enum: MediaTypeEnum, default: MediaTypeEnum.PUBLIC })
  type: MediaTypeEnum;
}
