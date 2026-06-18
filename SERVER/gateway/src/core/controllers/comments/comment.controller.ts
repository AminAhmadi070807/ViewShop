import { Controller } from '@nestjs/common';
import { CoreService } from '../../core.service';

@Controller('core/comments')
export class ProductController {
  constructor(private readonly coreService: CoreService) {}
}
