import { Injectable } from '@nestjs/common';
import { TicketDto } from './dto/ticket.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Ticket } from './entities/ticket.entity';
import { Repository } from 'typeorm';
import { CustomException } from '../../common/exceptions/custom.exception.error';
import { statusMessages } from '../../common/message/message.status';

@Injectable()
export class TicketsService {
  constructor(
    @InjectRepository(Ticket)
    private readonly ticketRepository: Repository<Ticket>,
  ) {}

  async create(data: TicketDto) {
    try {
      const ticket: Ticket = this.ticketRepository.create({
        title: data.title,
        description: data.description,
        department: data.department,
        user: {
          id: data.user,
        },
      });

      await this.ticketRepository.save(ticket);

      return {
        status: 201,
        message: statusMessages.fa['201'],
        body: null,
      };
    } catch {
      throw new CustomException(statusMessages.fa['500'], 500);
    }
  }

  findAll() {
    return `This action returns all tickets`;
  }

  findOne(id: string) {
    return `This action returns a #${id} ticket`;
  }

  update(data: TicketDto) {
    return data;
  }

  remove(id: string) {
    return `This action removes a #${id} ticket`;
  }
}
