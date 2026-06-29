import { Controller } from '@nestjs/common';
import { MessagePattern, Payload } from '@nestjs/microservices';
import { TicketsService } from './tickets.service';
import { CreateTicketDto } from './dto/create-ticket.dto';
import { UpdateTicketDto } from './dto/update-ticket.dto';

@Controller()
export class TicketsController {
  constructor(private readonly ticketsService: TicketsService) {}

  @MessagePattern('createTicket')
  create(@Payload() createTicketDto: CreateTicketDto) {
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
  update(@Payload() updateTicketDto: UpdateTicketDto) {
    return this.ticketsService.update(updateTicketDto.id, updateTicketDto);
  }

  @MessagePattern('removeTicket')
  remove(@Payload() id: number) {
    return this.ticketsService.remove(id);
  }
}
