import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Patch,
  Post,
  Req,
} from '@nestjs/common';
import { CoreService } from '../../core.service';
import { UpdateWishlistDto, WishlistDto } from './wishlist.dto';
import express from 'express';
import { JwtPayload } from '../../../common/validation/jwt.dto';
import {
  ApiBadRequestResponse,
  ApiConflictResponse,
  ApiCreatedResponse,
  ApiForbiddenResponse,
  ApiInternalServerErrorResponse,
  ApiNoContentResponse,
  ApiNotFoundResponse,
  ApiOkResponse,
  ApiUnauthorizedResponse,
} from '@nestjs/swagger';
import { statusMessages } from '../../../common/messages/status.message';
import { ValidateUUID } from '../../../common/validation/uuid.dto';

@Controller('core/wishlist')
@ApiInternalServerErrorResponse({ description: statusMessages.fa['500'] })
export class WishlistController {
  constructor(private readonly coreService: CoreService) {}

  @Post()
  @ApiCreatedResponse({ description: statusMessages.fa['201'] })
  @ApiBadRequestResponse({ description: statusMessages.fa['400'] })
  @ApiUnauthorizedResponse({ description: statusMessages.fa['401'] })
  @ApiNotFoundResponse({ description: statusMessages.fa['404'] })
  @ApiConflictResponse({ description: statusMessages.fa['409'] })
  create(@Body() data: WishlistDto, @Req() req: express.Request) {
    const user: JwtPayload = req.user as JwtPayload;

    return this.coreService.send('WISHLIST:CREATE', {
      user: user.userId,
      ...data,
    });
  }

  @Get()
  @ApiOkResponse({ description: statusMessages.fa['200'] })
  @ApiUnauthorizedResponse({ description: statusMessages.fa['401'] })
  @ApiForbiddenResponse({ description: statusMessages.fa['403'] })
  findAll() {
    return this.coreService.send('WISHLIST:FIND');
  }

  @Get('/:id')
  @ApiOkResponse({ description: statusMessages.fa['200'] })
  @ApiNotFoundResponse({ description: statusMessages.fa['404'] })
  findOne(@Param() data: ValidateUUID) {
    return this.coreService.send('WISHLIST:ONE', data);
  }

  @Patch()
  @ApiNoContentResponse({ description: statusMessages.fa['204'] })
  @ApiBadRequestResponse({ description: statusMessages.fa['400'] })
  @ApiUnauthorizedResponse({ description: statusMessages.fa['401'] })
  @ApiForbiddenResponse({ description: statusMessages.fa['403'] })
  @ApiNotFoundResponse({ description: statusMessages.fa['404'] })
  update(@Body() data: UpdateWishlistDto) {
    return this.coreService.send('WISHLIST:UPDATE', data);
  }

  @Delete()
  @ApiNoContentResponse({ description: statusMessages.fa['204'] })
  @ApiBadRequestResponse({ description: statusMessages.fa['400'] })
  @ApiUnauthorizedResponse({ description: statusMessages.fa['401'] })
  @ApiForbiddenResponse({ description: statusMessages.fa['403'] })
  @ApiNotFoundResponse({ description: statusMessages.fa['404'] })
  delete(@Body() data: ValidateUUID) {
    return this.coreService.send('WISHLIST:DELETE', data);
  }
}
