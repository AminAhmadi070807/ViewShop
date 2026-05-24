import {
  Column,
  CreateDateColumn,
  Entity,
  OneToMany,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';
import { UserRoleEnum } from '../../../common/enums/users/user.enum';
import { Auth } from '../../auth/entities/auth.entity';
import { Address } from '../../addresses/entities/address.entity';

@Entity('users')
export class User {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({ type: 'varchar', length: 11, unique: true, nullable: false })
  phone: string;

  @Column({ type: 'varchar', nullable: false })
  password: string;

  @Column({ type: 'varchar', nullable: true, length: 50 })
  fullName: string;

  @Column({
    type: 'enum',
    enum: UserRoleEnum,
    default: UserRoleEnum.USER,
    nullable: false,
  })
  role: UserRoleEnum;

  @Column({ type: 'boolean', nullable: false, default: false })
  verified: boolean;

  @OneToMany(() => Auth, (auth: Auth) => auth.user)
  tokens: Auth[];

  @OneToMany(() => Address, (address: Address) => address.user)
  addresses: Address[];

  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updatedAt: Date;
}
