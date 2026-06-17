import { Controller } from '@nestjs/common';
import { CoreService } from '../../../core.service';
import { ApiInternalServerErrorResponse } from '@nestjs/swagger';
import { statusMessages } from '../../../../common/messages/status.message';

@Controller('core/parent/product')
export class ParentProductController {
  constructor(private readonly coreService: CoreService) {}
}
