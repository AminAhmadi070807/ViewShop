import { UseInterceptors } from '@nestjs/common';
import { FileInterceptor } from '@nestjs/platform-express';
import { MulterOptions } from '../config/multer.config';

export function Upload(title: string) {
  return UseInterceptors(FileInterceptor(title, MulterOptions));
}
