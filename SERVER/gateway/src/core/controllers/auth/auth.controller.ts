import { Controller } from '@nestjs/common';
import { CoreService } from '../../core.service';

@Controller('auth')
export class AuthController {
  constructor(private readonly coreService: CoreService) {}
}
