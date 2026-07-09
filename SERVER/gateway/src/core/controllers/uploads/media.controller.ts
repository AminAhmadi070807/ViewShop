import { Body, Controller, Get, Post, Req, UploadedFile } from '@nestjs/common';
import { Upload } from '../../../common/decorators/upload.decorator';
import {
  ApiBadRequestResponse,
  ApiBody,
  ApiConflictResponse,
  ApiConsumes,
  ApiCreatedResponse,
  ApiForbiddenResponse,
  ApiInternalServerErrorResponse,
  ApiOkResponse,
  ApiUnauthorizedResponse,
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
@ApiInternalServerErrorResponse({ description: statusMessages.fa['500'] })
export class MediaController {
  constructor(private readonly coreService: CoreService) {
    const uploadPath: string = path.join(process.cwd(), 'uploads');

    if (!existsSync(uploadPath)) mkdirSync('./uploads', { recursive: true });
  }

  @Post('uploads')
  @ApiCreatedResponse({ description: statusMessages.fa['200'] })
  @ApiBadRequestResponse({ description: statusMessages.fa['400'] })
  @ApiUnauthorizedResponse({ description: statusMessages.fa['401'] })
  @ApiForbiddenResponse({ description: statusMessages.fa['403'] })
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
        title: {
          type: 'string',
          minLength: 3,
          maxLength: 24,
          example: '',
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

  @Get()
  @ApiOkResponse({ description: statusMessages.fa['200'] })
  @ApiUnauthorizedResponse({ description: statusMessages.fa['401'] })
  @ApiForbiddenResponse({ description: statusMessages.fa['403'] })
  findAll() {
    return this.coreService.send('MEDIA:FIND');
  }

  @Get('search')
  @ApiOkResponse({ description: statusMessages.fa['200'] })
  @ApiBadRequestResponse({ description: statusMessages.fa['400'] })
  @ApiUnauthorizedResponse({ description: statusMessages.fa['401'] })
  @ApiForbiddenResponse({ description: statusMessages.fa['403'] })
  search(@Body() data: ValidateTitle) {
    return this.coreService.send('MEDIA:SEARCH', data);
  }
}
