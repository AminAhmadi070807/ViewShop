import { Column, Entity, ManyToOne, PrimaryGeneratedColumn } from 'typeorm';
import { Role } from '../../roles/entities/role.entity';

@Entity('singular')
export class Singular {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({ type: 'varchar', nullable: false, unique: true })
  title: string;

  @ManyToOne(() => Role, (role: Role) => role.singular, { onUpdate: 'CASCADE' })
  role: Role;
}
