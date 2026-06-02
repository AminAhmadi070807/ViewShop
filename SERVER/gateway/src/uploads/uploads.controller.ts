import { Controller, Post } from '@nestjs/common';

@Controller('gateway/uploads')
export class UploadsController {
  constructor() {}

  @Post()
  upload() {
    return 'AMIN';
  }
}
