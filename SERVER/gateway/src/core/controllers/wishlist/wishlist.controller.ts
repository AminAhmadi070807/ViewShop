import { Controller } from '@nestjs/common';
import { CoreService } from '../../core.service';

@Controller('core/wishlist')
export class WishlistController {
  constructor(private readonly coreService: CoreService) {}
}
