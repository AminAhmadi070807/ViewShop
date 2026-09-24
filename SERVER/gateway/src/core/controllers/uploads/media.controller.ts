import {
  Body,
  Controller,
  Delete,
  Get,
  Post,
  Query,
  Req,
  UploadedFile,
} from '@nestjs/common';
import { Upload } from '../../../common/decorators/upload.decorator';
import {
  ApiBadRequestResponse,
  ApiConflictResponse,
  ApiConsumes,
  ApiCreatedResponse,
  ApiForbiddenResponse,
  ApiHeaders,
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
import { ValidateUUID } from '../../../common/validation/uuid.dto';

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
  @Upload('media')
  @ApiHeaders([
    { name: 'feature', required: true, example: 'MEDIA', enum: ['MEDIA'] },
    { name: 'permission', required: true, example: 'CREATE', enum: ['CREATE'] },
  ])
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
      type: data.type,
    });
  }

  @Get()
  @ApiOkResponse({ description: statusMessages.fa['200'] })
  @ApiUnauthorizedResponse({ description: statusMessages.fa['401'] })
  @ApiForbiddenResponse({ description: statusMessages.fa['403'] })
  @ApiHeaders([
    { name: 'feature', required: true, example: 'MEDIA', enum: ['MEDIA'] },
    { name: 'permission', required: true, example: 'READ', enum: ['READ'] },
  ])
  findAll() {
    return this.coreService.send('MEDIA:FIND');
  }

  @Get('search')
  @ApiOkResponse({ description: statusMessages.fa['200'] })
  @ApiBadRequestResponse({ description: statusMessages.fa['400'] })
  @ApiUnauthorizedResponse({ description: statusMessages.fa['401'] })
  @ApiForbiddenResponse({ description: statusMessages.fa['403'] })
  @ApiHeaders([
    { name: 'feature', required: true, example: 'MEDIA', enum: ['MEDIA'] },
    { name: 'permission', required: true, example: 'SEARCH', enum: ['SEARCH'] },
  ])
  search(@Query() data: ValidateTitle) {
    return this.coreService.send('MEDIA:SEARCH', data);
  }

  @Delete()
  @ApiOkResponse({ description: statusMessages.fa['200'] })
  @ApiBadRequestResponse({ description: statusMessages.fa['400'] })
  @ApiUnauthorizedResponse({ description: statusMessages.fa['401'] })
  @ApiForbiddenResponse({ description: statusMessages.fa['403'] })
  @ApiHeaders([
    { name: 'feature', required: true, example: 'MEDIA', enum: ['MEDIA'] },
    { name: 'permission', required: true, example: 'DELETE', enum: ['DELETE'] },
  ])
  remove(@Body() data: ValidateUUID) {
    return this.coreService.send('MEDIA:DELETE', data);
  }
}
