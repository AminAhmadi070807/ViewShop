import { Controller } from '@nestjs/common';
import { VerifiesService } from './verifies.service';

@Controller()
export class VerifiesController {
  constructor(private readonly verifiesService: VerifiesService) {}
}
