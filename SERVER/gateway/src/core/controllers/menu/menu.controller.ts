import { Controller } from '@nestjs/common';
import { CoreService } from '../../core.service';

@Controller('core/menus')
export class MenusController {
  constructor(private readonly coreService: CoreService) {}
}
