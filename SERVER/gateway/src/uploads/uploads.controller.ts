import { Controller, Post, UploadedFile } from '@nestjs/common';
import { Upload } from '../common/decorators/upload.decorator';
import {
  ApiBody,
  ApiConsumes,
  ApiInternalServerErrorResponse,
  ApiOkResponse,
} from '@nestjs/swagger';
import { existsSync } from 'node:fs';
import { mkdirSync } from 'fs';
import { statusMessages } from '../common/messages/status.message';
import path from 'node:path';

@Controller('gateway/uploads')
export class UploadsController {
  constructor() {
    const uploadPath = path.join(process.cwd(), 'uploads');

    if (!existsSync(uploadPath)) {
      mkdirSync('./uploads', { recursive: true });
    }
  }

  @Post()
  @ApiOkResponse({
    description: statusMessages.fa['200'],
  })
  @ApiInternalServerErrorResponse({
    description: statusMessages.fa['500'],
  })
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
      status: 200,
      message: statusMessages.fa['200'],
      body: {
        mimetype: file.mimetype,
        path: file.path,
        size: file.size,
      },
    };
  }
}
