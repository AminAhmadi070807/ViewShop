import { Controller } from '@nestjs/common';
import { CoreService } from '../../../core.service';

@Controller('core/parent/product')
export class ParentProductController {
  constructor(private readonly coreService: CoreService) {}
}
