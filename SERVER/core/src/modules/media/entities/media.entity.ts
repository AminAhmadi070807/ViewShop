import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';
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
}
