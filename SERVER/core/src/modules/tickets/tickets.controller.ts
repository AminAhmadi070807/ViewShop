import { Controller } from '@nestjs/common';
import { MessagePattern, Payload } from '@nestjs/microservices';
import { TicketsService } from './tickets.service';
import { TicketDto } from './dto/ticket.dto';

@Controller()
export class TicketsController {
  constructor(private readonly ticketsService: TicketsService) {}

  @MessagePattern('createTicket')
  create(@Payload() createTicketDto: TicketDto) {
    return this.ticketsService.create(createTicketDto);
  }

  @MessagePattern('findAllTickets')
  findAll() {
    return this.ticketsService.findAll();
  }

  @MessagePattern('findOneTicket')
  findOne(@Payload() id: number) {
    return this.ticketsService.findOne(id);
  }

  @MessagePattern('updateTicket')
  update(@Payload() data: TicketDto) {
    return this.ticketsService.update(data);
  }

  @MessagePattern('removeTicket')
  remove(@Payload() id: string) {
    return this.ticketsService.remove(id);
  }
}
