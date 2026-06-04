import { Body, Controller, Get, Post, Req, UploadedFile } from '@nestjs/common';
import { Upload } from '../../../common/decorators/upload.decorator';
import {
  ApiBody,
  ApiConflictResponse,
  ApiConsumes,
  ApiCreatedResponse,
  ApiInternalServerErrorResponse,
  ApiOkResponse,
} from '@nestjs/swagger';
import { existsSync } from 'node:fs';
import { mkdirSync } from 'fs';
import { statusMessages } from '../../../common/messages/status.message';
import path from 'node:path';
import { CoreService } from '../../core.service';
import { MediaDto } from './media.dto';
import express from 'express';
import { JwtPayload } from '../../../common/validation/jwt.dto';
import { ValidateTitle } from '../../../common/validation/title.dto';

@Controller('core/media')
@ApiInternalServerErrorResponse({
  description: statusMessages.fa['500'],
})
export class MediaController {
  constructor(private readonly coreService: CoreService) {
    const uploadPath: string = path.join(process.cwd(), 'uploads');

    if (!existsSync(uploadPath)) mkdirSync('./uploads', { recursive: true });
  }

  @Post()
  @ApiCreatedResponse({
    description: statusMessages.fa['200'],
  })
  @ApiConflictResponse({ description: statusMessages.fa['409'] })
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

  @ApiOkResponse({ description: statusMessages.fa['200'] })
  @Get()
  findAll() {
    return this.coreService.send('MEDIA:FIND');
  }

  @ApiOkResponse({ description: statusMessages.fa['200'] })
  @Get('search')
  search(@Body() data: ValidateTitle) {
    return this.coreService.send('MEDIA:SEARCH', data);
  }
}
