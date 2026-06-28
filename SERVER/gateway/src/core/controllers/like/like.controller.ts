import { CoreService } from '../../core.service';
import { Controller } from '@nestjs/common';

@Controller('core/likes')
export class LikeController {
  constructor(private readonly coreService: CoreService) {}
}
