import { Body, Controller, Get, Post } from '@nestjs/common';
import { CoreService } from '../../core.service';
import { BrandDto } from './brand.dto';
import { ApiConflictResponse, ApiCreatedResponse } from '@nestjs/swagger';
import { statusMessages } from '../../../common/messages/status.message';

@Controller('core/brands')
export class BrandController {
  constructor(private readonly coreService: CoreService) {}

  @Post()
  @ApiCreatedResponse({ description: statusMessages.fa['201'] })
  @ApiConflictResponse({ description: statusMessages.fa['409'] })
  create(@Body() data: BrandDto) {
    return this.coreService.send('BRAND:CREATE', data);
  }

  @Get()
  findAll() {
    return this.coreService.send('BRAND:FIND');
  }
}
