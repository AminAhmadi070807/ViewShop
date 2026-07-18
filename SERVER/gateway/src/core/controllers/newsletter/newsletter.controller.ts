import { Controller } from '@nestjs/common';
import { CoreService } from '../../core.service';

@Controller('core/newsletter')
export class NewsletterController {
  constructor(private readonly coreService: CoreService) {}
}
