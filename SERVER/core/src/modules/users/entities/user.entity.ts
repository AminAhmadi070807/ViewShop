import {
  Column,
  CreateDateColumn,
  Entity,
  OneToMany,
  OneToOne,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';
import { UserRoleEnum } from '../../../common/enums/users/user.enum';
import { Auth } from '../../auth/entities/auth.entity';
import { Wallet } from '../../wallets/entities/wallet.entity';

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

  @OneToOne(() => Wallet, (wallet: Wallet) => wallet.user)
  wallet: Wallet;

  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updatedAt: Date;
}
