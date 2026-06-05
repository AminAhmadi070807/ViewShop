import { Controller } from '@nestjs/common';
import { CoreService } from '../../../core.service';

@Controller('core/media')
export class MediaController {
  constructor(private readonly coreService: CoreService) {}
}
