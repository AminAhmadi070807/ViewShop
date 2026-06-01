import { UseInterceptors } from '@nestjs/common';
import { FileInterceptor } from '@nestjs/platform-express';
import { MulterOptions } from '../config/multer.config';

export function Upload(patch: string) {
  return UseInterceptors(FileInterceptor(patch, MulterOptions));
}
