import { Controller } from '@nestjs/common';
import { CoreService } from '../../core.service';

@Controller('core/filter')
export class FilterController {
  constructor(private readonly coreService: CoreService) {}
}
