import { Column, Entity, ManyToMany, PrimaryGeneratedColumn } from 'typeorm';
import { Role } from './role.entity';

@Entity('guards')
export class Guard {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({ type: 'varchar', length: 255, unique: true, nullable: false })
  patch: string;

  @ManyToMany(() => Role, (role: Role) => role.guards, { eager: true })
  roles: Role[];

  @Column({ type: 'boolean', nullable: false, default: false })
  public: boolean;
}
