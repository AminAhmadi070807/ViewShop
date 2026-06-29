import { Injectable } from '@nestjs/common';
import { TicketDto, UpdateTicketDto } from './dto/ticket.dto';
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
    } catch (error) {
      console.log(error);
      throw new CustomException(statusMessages.fa['500'], 500);
    }
  }

  async findAll() {
    try {
      const tickets: Ticket[] = await this.ticketRepository.find({
        order: {
          createdAt: 'DESC',
        },
      });

      return {
        status: 200,
        body: tickets,
        message: statusMessages.fa['200'],
      };
    } catch {
      throw new CustomException(statusMessages.fa['500'], 500);
    }
  }

  async findOne(id: string) {
    try {
      const ticket: Ticket | null = await this.ticketRepository.findOneBy({
        id,
      });

      if (!ticket) return new CustomException(statusMessages.fa['404'], 404);

      return {
        status: 200,
        message: statusMessages.fa['200'],
        body: ticket,
      };
    } catch {
      throw new CustomException(statusMessages.fa['500'], 500);
    }
  }

  async update(data: UpdateTicketDto) {
    try {
      const ticket: Ticket | null = await this.ticketRepository.findOne({
        where: {
          id: data.id,
        },
      });

      if (!ticket) return new CustomException(statusMessages.fa['404'], 404);

      ticket.data.push({
        description: data.description,
        date: new Date().toLocaleString(),
        media: data.media,
      });

      await this.ticketRepository.save(ticket);

      return {
        status: 200,
        message: statusMessages.fa['200'],
        body: ticket,
      };
    } catch {
      throw new CustomException(statusMessages.fa['500'], 500);
    }
  }

  async remove(id: string) {
    try {
      await this.ticketRepository.delete(id);

      return {
        status: 204,
        message: statusMessages.fa['204'],
        body: null,
      };
    } catch {
      throw new CustomException(statusMessages.fa['500'], 500);
    }
  }
}
