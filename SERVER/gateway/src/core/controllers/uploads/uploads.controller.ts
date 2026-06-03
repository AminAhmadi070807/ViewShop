import { Body, Controller, Post, Req, UploadedFile } from '@nestjs/common';
import { Upload } from '../../../common/decorators/upload.decorator';
import {
  ApiBody,
  ApiConsumes,
  ApiInternalServerErrorResponse,
  ApiOkResponse,
} from '@nestjs/swagger';
import { existsSync } from 'node:fs';
import { mkdirSync } from 'fs';
import { statusMessages } from '../../../common/messages/status.message';
import path from 'node:path';
import { CoreService } from '../../core.service';
import { MediaDto } from './uploads.dto';
import express from 'express';
import { JwtPayload } from '../../../common/validation/jwt.dto';

@Controller('core/media')
export class MediaController {
  constructor(private readonly coreService: CoreService) {
    const uploadPath: string = path.join(process.cwd(), 'uploads');

    if (!existsSync(uploadPath)) mkdirSync('./uploads', { recursive: true });
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
  upload(
    @UploadedFile() file: Express.Multer.File,
    @Body() data: MediaDto,
    @Req() req: express.Request,
  ) {
    const user: JwtPayload = req.user as JwtPayload;

    return this.coreService.send('MEDIA:UPLOAD', {
      path: file.path,
      title: data.title,
      user: user.userId,
    });
  }
}
