import { Controller, Post, UploadedFile } from '@nestjs/common';
import { Upload } from '../common/decorators/upload.decorator';
import { ApiBody, ApiConsumes } from '@nestjs/swagger';
import { existsSync } from 'node:fs';
import { mkdirSync } from 'fs';

@Controller('gateway/uploads')
export class UploadsController {
  constructor() {
    if (!existsSync('../../uploads')) {
      mkdirSync('../../uploads', { recursive: true });
    }
  }

  @Post()
  @ApiConsumes('multipart/form-data')
  @ApiBody({
    schema: {
      type: 'object',
      properties: {
        media: {
          type: 'string',
          format: 'binary',
          description: 'uploading file',
        },
      },
    },
  })
  @Upload('media')
  upload(@UploadedFile() file: Express.Multer.File) {
    return {
      mimetype: file.mimetype,
      path: file.path,
      size: file.size,
    };
  }
}
