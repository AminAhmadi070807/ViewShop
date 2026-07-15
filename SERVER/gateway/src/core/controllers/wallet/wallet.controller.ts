import { Controller } from '@nestjs/common';
import { CoreService } from '../../core.service';

@Controller('core/wallet')
export class WalletController {
  constructor(private readonly coreService: CoreService) {}
}
