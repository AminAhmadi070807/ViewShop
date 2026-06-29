import { Injectable } from '@nestjs/common';
import { TicketDto } from './dto/ticket.dto';
import { UpdateTicketDto } from './dto/update-ticket.dto';

@Injectable()
export class TicketsService {
  create(createTicketDto: TicketDto) {
    return 'This action adds a new ticket';
  }

  findAll() {
    return `This action returns all tickets`;
  }

  findOne(id: number) {
    return `This action returns a #${id} ticket`;
  }

  update(id: number, updateTicketDto: UpdateTicketDto) {
    return `This action updates a #${id} ticket`;
  }

  remove(id: number) {
    return `This action removes a #${id} ticket`;
  }
}
