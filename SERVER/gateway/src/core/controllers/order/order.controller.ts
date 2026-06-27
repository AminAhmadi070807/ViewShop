import { Controller } from '@nestjs/common';
import { CoreService } from '../../core.service';

@Controller('core/order')
export class OrderController {
  constructor(private readonly coreService: CoreService) {}
}
