import { Controller } from '@nestjs/common';
import { CoreService } from '../../../core.service';
import { ApiInternalServerErrorResponse } from '@nestjs/swagger';
import { statusMessages } from '../../../../common/messages/status.message';

@Controller('core/categories')
@ApiInternalServerErrorResponse({ description: statusMessages.fa['500'] })
export class CategoryController {
  constructor(private readonly coreService: CoreService) {}
}
