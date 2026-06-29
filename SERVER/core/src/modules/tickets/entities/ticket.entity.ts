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

@Entity('tickets')
export class Ticket {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({ type: 'enum', nullable: false, enum: TicketsDepartmentEnum })
  department: TicketsDepartmentEnum;

  @Column({ type: 'string', nullable: true })
  title: string | null;

  @Column({ type: 'varchar', nullable: false })
  description: string;

  @Column({
    type: 'enum',
    enum: TicketsStatusEnum,
    default: TicketsStatusEnum.WAITING,
  })
  status: TicketsStatusEnum;

  @Column({ type: 'simple-json', nullable: false, array: true })
  data: [
    {
      date: string;
      description: string;
      media: string;
    },
  ];

  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updatedAt: Date;
}
