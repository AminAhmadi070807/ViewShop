import { Controller } from '@nestjs/common';
import { CoreService } from '../../core.service';

@Controller('core/users')
export class UsersController {
  constructor(private readonly coreService: CoreService) {}
}
