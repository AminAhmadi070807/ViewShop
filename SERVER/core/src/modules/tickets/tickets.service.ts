import { Injectable } from '@nestjs/common';
import { TicketDto } from './dto/ticket.dto';

@Injectable()
export class TicketsService {
  create(data: TicketDto) {
    return 'This action adds a new ticket';
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
