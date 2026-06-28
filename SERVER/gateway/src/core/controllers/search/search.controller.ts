import { CoreService } from '../../core.service';
import { Controller } from '@nestjs/common';

@Controller('search')
export class SearchController {
  constructor(private readonly coreService: CoreService) {}
}
