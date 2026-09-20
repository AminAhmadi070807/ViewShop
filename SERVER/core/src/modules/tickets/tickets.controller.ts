import { Controller } from '@nestjs/common';
import { MessagePattern, Payload } from '@nestjs/microservices';
import { TicketsService } from './tickets.service';
import { TicketDto, UpdateTicketDto } from './dto/ticket.dto';
import { PageFilter } from '../../common/filters/page.filter';
import { Validate } from '../../common/validations/validate.dto';

@Controller()
export class TicketsController {
  constructor(private readonly ticketsService: TicketsService) {}

  @MessagePattern('TICKETS:CREATE')
  create(@Payload() data: TicketDto) {
    return this.ticketsService.create(data);
  }

  @MessagePattern('TICKETS:FIND')
  findAll(@Payload() data: PageFilter) {
    return this.ticketsService.findAll(data.page);
  }

  @MessagePattern('TICKETS:ONE')
  findOne(@Payload() data: Validate) {
    return this.ticketsService.findOne(data.id);
  }

  @MessagePattern('TICKETS:UPDATE')
  update(@Payload() data: UpdateTicketDto) {
    return this.ticketsService.update(data);
  }

  @MessagePattern('TICKETS:DELETE')
  remove(@Payload() data: Validate) {
    return this.ticketsService.remove(data.id);
  }
}
