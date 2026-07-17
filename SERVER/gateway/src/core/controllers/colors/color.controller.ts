import { Controller } from '@nestjs/common';
import { CoreService } from '../../core.service';

@Controller('core/colors')
export class ColorController {
  constructor(private readonly coreService: CoreService) {}
}
