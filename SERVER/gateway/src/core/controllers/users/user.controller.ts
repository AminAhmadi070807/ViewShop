import { Body, Controller, Get, Post } from '@nestjs/common';
import { CoreService } from '../../core.service';
import { UserValidator } from './user.dto';
import {
  ApiBadRequestResponse,
  ApiConflictResponse,
  ApiCreatedResponse,
} from '@nestjs/swagger';

@Controller('core/users')
export class UsersController {
  constructor(private readonly coreService: CoreService) {}

  @Post()
  @ApiCreatedResponse({
    description: 'User created successfully.',
    type: UserValidator,
  })
  @ApiConflictResponse({ description: 'This phone number already registered.' })
  @ApiBadRequestResponse({ description: 'Validation failed.' })
  create(@Body() data: UserValidator) {
    return this.coreService.send('USER:CREATE', data);
  }
}
