import { Controller } from '@nestjs/common';
import { CoreService } from '../../../core.service';

@Controller('core/categories')
export class SubCategoryController {
  constructor(private readonly coreService: CoreService) {}
}
