import { Controller } from '@nestjs/common';
import { GuardsService } from '../../guards.service';

@Controller('guard/feature')
export class FeatureController {
  constructor(private readonly guardService: GuardsService) {}
}
