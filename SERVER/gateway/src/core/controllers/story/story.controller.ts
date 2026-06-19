import { Controller } from '@nestjs/common';
import { CoreService } from '../../core.service';

@Controller()
export class StoryController {
  constructor(private readonly coreService: CoreService) {}
}