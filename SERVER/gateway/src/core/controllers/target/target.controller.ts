import { Controller } from '@nestjs/common';
import { CoreService } from '../../core.service';

@Controller('core/target')
export class TargetController {
  constructor(private readonly coreService: CoreService) {}
}
