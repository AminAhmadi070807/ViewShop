import { Controller } from '@nestjs/common';
import { CoreService } from '../../core.service';

@Controller('core/setting')
export class SettingController {
  constructor(private readonly coreService: CoreService) {}
}
