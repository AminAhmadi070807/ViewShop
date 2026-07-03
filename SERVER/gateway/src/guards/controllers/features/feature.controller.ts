import { Body, Controller, Post } from '@nestjs/common';
import { GuardsService } from '../../guards.service';
import { ValidateTitle } from '../../../common/validation/title.dto';

@Controller('guard/feature')
export class FeatureController {
  constructor(private readonly guardService: GuardsService) {}

  @Post()
  create(@Body() data: ValidateTitle) {
    return this.guardService.send('FEATURE:CREATE', data);
  }
}
