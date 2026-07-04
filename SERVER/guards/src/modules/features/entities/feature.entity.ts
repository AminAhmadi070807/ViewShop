import {
  Column,
  CreateDateColumn,
  Entity,
  OneToMany,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';
import { Guard } from '../../guards/entities/guard.entity';
import { Role } from '../../roles/entities/role.entity';

@Entity('features')
export class Feature {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({ type: 'varchar', nullable: false, unique: true })
  title: string;

  @OneToMany(() => Guard, (guard: Guard) => guard.feature, {
    onUpdate: 'CASCADE',
    nullable: true,
  })
  guards: Guard[];

  @OneToMany(() => Role, (role: Role) => role.features, { nullable: false })
  roles: Role[];

  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updatedAt: Date;
}
