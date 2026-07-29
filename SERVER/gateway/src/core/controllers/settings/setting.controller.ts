import { Body, Controller, Post } from '@nestjs/common';
import { CoreService } from '../../core.service';
import { SettingDto } from './setting.dto';

@Controller('core/setting')
export class SettingController {
  constructor(private readonly coreService: CoreService) {}

  @Post()
  setting(@Body() data: SettingDto) {
    return this.coreService.send('SETTING', data);
  }
}
