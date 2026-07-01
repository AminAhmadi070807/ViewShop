import { Controller } from '@nestjs/common';
import { CoreService } from '../../core.service';

@Controller('core/report')
export class ReportController {
  constructor(private readonly coreService: CoreService) {}
}
