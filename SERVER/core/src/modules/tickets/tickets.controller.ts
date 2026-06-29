import { Controller } from '@nestjs/common';
import { MessagePattern, Payload } from '@nestjs/microservices';
import { TicketsService } from './tickets.service';
import { TicketDto } from './dto/ticket.dto';

@Controller()
export class TicketsController {
  constructor(private readonly ticketsService: TicketsService) {}

  @MessagePattern('TICKETS:CREATE')
  create(@Payload() data: TicketDto) {
    return this.ticketsService.create(data);
  }

  @MessagePattern('TICKETS:FIND')
  findAll() {
    return this.ticketsService.findAll();
  }

  @MessagePattern('TICKETS:ONE')
  findOne(@Payload() id: string) {
    return this.ticketsService.findOne(id);
  }

  @MessagePattern('TICKETS:UPDATE')
  update(@Payload() data: TicketDto) {
    return this.ticketsService.update(data);
  }

  @MessagePattern('TICKETS:DELETE')
  remove(@Payload() id: string) {
    return this.ticketsService.remove(id);
  }
}
