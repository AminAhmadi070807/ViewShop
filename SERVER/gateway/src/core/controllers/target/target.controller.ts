import { Body, Controller, Post } from '@nestjs/common';
import { CoreService } from '../../core.service';
import { TargetDto } from './target.dto';

@Controller('core/target')
export class TargetController {
  constructor(private readonly coreService: CoreService) {}

  @Post()
  create(@Body() data: TargetDto) {
    return this.coreService.send('TARGET:CREATE', data);
  }
}
