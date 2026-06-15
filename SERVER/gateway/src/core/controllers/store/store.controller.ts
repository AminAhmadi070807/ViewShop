import { Controller } from '@nestjs/common';
import { CoreService } from '../../core.service';

@Controller('core/store')
export class MediaController {
  constructor(private readonly coreService: CoreService) {}
}
