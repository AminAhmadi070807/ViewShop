import { Controller } from '@nestjs/common';
import { CoreService } from '../../core.service';

@Controller('core/articles')
export class ArticleController {
  constructor(private readonly coreService: CoreService) {
  }
}
