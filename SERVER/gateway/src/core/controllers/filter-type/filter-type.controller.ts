import { Controller } from '@nestjs/common';
import { CoreService } from '../../core.service';

@Controller('core/filter-type')
export class FilterTypeController {
  constructor(private readonly coreService: CoreService) {}
}
