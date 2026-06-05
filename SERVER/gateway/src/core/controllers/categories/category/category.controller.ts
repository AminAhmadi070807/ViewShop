import { Body, Controller, Post, Req } from '@nestjs/common';
import { CoreService } from '../../../core.service';
import { CategoryDto } from './category.dto';
import express from 'express';
import { JwtPayload } from '../../../../common/validation/jwt.dto';

@Controller('core/categories')
export class MediaController {
  constructor(private readonly coreService: CoreService) {}

  @Post()
  create(@Body() data: CategoryDto, @Req() req: express.Request) {
    const user: JwtPayload = req.user as JwtPayload;

    return this.coreService.send('CATEGORY:CREATE', {
      user: user.userId,
      title: data.title,
      link: data.link,
      icon: data.icon,
    });
  }
}
