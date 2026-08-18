import { Controller } from '@nestjs/common';
import { CoreService } from '../../core.service';

@Controller()
export class SmsController {
  constructor(private readonly coreService: CoreService) {}
}
