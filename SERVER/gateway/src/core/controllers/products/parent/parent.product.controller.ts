import { Body, Controller, Post, Req } from '@nestjs/common';
import { CoreService } from '../../../core.service';
import { ParentProductDto } from './parent.product.dto';
import express from 'express';
import { JwtPayload } from '../../../../common/validation/jwt.dto';

@Controller('core/parent/product')
export class ParentProductController {
  constructor(private readonly coreService: CoreService) {}

  @Post()
  create(@Body() data: ParentProductDto, @Req() req: express.Request) {
    const user: JwtPayload = req.user as JwtPayload;

    return this.coreService.send('PRODUCT:PARENT:CREATE', {
      userId: user.userId,
      ...data,
    });
  }
}
