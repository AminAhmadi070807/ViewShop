import { Controller, Post, UploadedFile } from '@nestjs/common';
import { UploadsService } from './uploads.service';
import { Upload } from '../common/decorators/upload.decorator';

@Controller('uploads')
export class UploadsController {
  constructor(private readonly uploadsService: UploadsService) {}

  @Post()
  @Upload('images')
  upload(@UploadedFile() file: Express.Multer.File) {
    return file;
  }
}
