import { Body, Controller, Get, Post } from '@nestjs/common';
import { CoreService } from '../../core.service';
import { UserValidator } from './user.dto';
import {
  ApiBadRequestResponse,
  ApiConflictResponse,
  ApiCreatedResponse,
} from '@nestjs/swagger';
import { Observable } from 'rxjs';

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
  create(@Body() data: UserValidator): Observable<unknown> {
    return this.coreService.send('USER:CREATE', data);
  }

  @Get()
  findAll(): Observable<unknown> {
    return this.coreService.send('USER:FIND');
  }
}
