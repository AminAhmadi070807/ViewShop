import { Controller } from '@nestjs/common';
import { CoreService } from '../../../core.service';
import { ApiInternalServerErrorResponse } from '@nestjs/swagger';
import { statusMessages } from '../../../../common/messages/status.message';

@Controller('core/sub/categories/')
@ApiInternalServerErrorResponse({ description: statusMessages.fa['500'] })
export class SubCategoryController {
  constructor(private readonly coreService: CoreService) {}
}
