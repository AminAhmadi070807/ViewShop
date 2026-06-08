import { Controller } from '@nestjs/common';
import { CoreService } from '../../../core.service';

@Controller('core/sub/categories/')
export class SubCategoryController {
  constructor(private readonly coreService: CoreService) {}
}
