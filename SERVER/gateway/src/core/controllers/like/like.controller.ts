import { CoreService } from '../../core.service';
import { Body, Controller, Get, Post, Req } from '@nestjs/common';
import { LikeDto } from './like.dto';
import express from 'express';
import { JwtPayload } from '../../../common/validation/jwt.dto';
import {
  ApiBadRequestResponse,
  ApiHeaders,
  ApiInternalServerErrorResponse,
  ApiNotFoundResponse,
  ApiOkResponse,
  ApiUnauthorizedResponse,
} from '@nestjs/swagger';
import { statusMessages } from '../../../common/messages/status.message';

@Controller('core/likes')
@ApiInternalServerErrorResponse({ description: statusMessages.fa['500'] })
export class LikeController {
  constructor(private readonly coreService: CoreService) {}

  @Post()
  @ApiOkResponse({ description: statusMessages.fa['200'] })
  @ApiBadRequestResponse({ description: statusMessages.fa['400'] })
  @ApiUnauthorizedResponse({ description: statusMessages.fa['401'] })
  @ApiNotFoundResponse({ description: statusMessages.fa['404'] })
  @ApiHeaders([
    {
      name: 'feature',
      required: true,
      example: 'LIKE',
      enum: ['LIKE'],
    },
    {
      name: 'permission',
      required: true,
      example: 'TOGGLE',
      enum: ['TOGGLE'],
    },
  ])
  toggle(@Body() data: LikeDto, @Req() req: express.Request) {
    const user: JwtPayload = req.user as JwtPayload;

    return this.coreService.send('LIKE:TOGGLE', {
      user: user.userId,
      product: data.product,
    });
  }

  @Get()
  @ApiOkResponse({ description: statusMessages.fa['200'] })
  @ApiHeaders([
    {
      name: 'feature',
      required: true,
      example: 'LIKE',
      enum: ['LIKE'],
    },
    {
      name: 'permission',
      required: true,
      example: 'READ',
      enum: ['READ'],
    },
  ])
  findAll() {
    return this.coreService.send('LIKE:FIND');
  }
}
