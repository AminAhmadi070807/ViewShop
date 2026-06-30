import { Controller } from '@nestjs/common';
import { CoreService } from '../../core.service';

@Controller('core/brands')
export class BrandController {
  constructor(private readonly coreService: CoreService) {}
}
