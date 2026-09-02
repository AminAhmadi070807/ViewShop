import { Controller } from '@nestjs/common';
import { CoreService } from '../../core.service';

@Controller('core/specification')
export class SpecificationController {
  constructor(private readonly coreService: CoreService) {}
}
