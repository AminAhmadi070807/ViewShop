import { Controller } from '@nestjs/common';
import { CoreService } from '../../core.service';

@Controller('core/tickets')
export class TicketController {
  constructor(private readonly coreService: CoreService) {}
}
