import {
  Column,
  CreateDateColumn,
  Entity,
  ManyToOne,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';
import {
  TicketsDepartmentEnum,
  TicketsStatusEnum,
} from '../../../common/enums/tickets/tickets.enum';
import { User } from '../../users/entities/user.entity';

@Entity('tickets')
export class Ticket {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({ type: 'enum', nullable: false, enum: TicketsDepartmentEnum })
  department: TicketsDepartmentEnum;

  @Column({ type: 'varchar', nullable: false })
  title: string;

  @Column({ type: 'varchar', nullable: false })
  description: string;

  @Column({
    type: 'enum',
    enum: TicketsStatusEnum,
    default: TicketsStatusEnum.WAITING,
  })
  status: TicketsStatusEnum;

  @Column({ type: 'simple-json', nullable: true, array: true, default: [] })
  data: [
    {
      date: string;
      description: string;
      media: string | null;
    },
  ];

  @ManyToOne(() => User, (user: User) => user.tickets, {
    onDelete: 'CASCADE',
    onUpdate: 'CASCADE',
  })
  user: User;

  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updatedAt: Date;
}
