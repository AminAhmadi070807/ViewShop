import { Body, Controller, Post, Req } from '@nestjs/common';
import { CoreService } from '../../core.service';
import { WishlistDto } from './wishlist.dto';
import express from 'express';
import { JwtPayload } from '../../../common/validation/jwt.dto';

@Controller('core/wishlist')
export class WishlistController {
  constructor(private readonly coreService: CoreService) {}

  @Post()
  create(@Body() data: WishlistDto, @Req() req: express.Request) {
    const user: JwtPayload = req.user as JwtPayload;

    return this.coreService.send('WISHLIST:CREATE', {
      user: user.userId,
      ...data,
    });
  }
}
