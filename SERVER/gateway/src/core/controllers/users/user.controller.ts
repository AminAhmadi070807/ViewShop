import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Patch,
  Post,
} from '@nestjs/common';
import { CoreService } from '../../core.service';
import { UserUpdateValidator, UserValidator } from './user.dto';
import {
  ApiBadRequestResponse,
  ApiConflictResponse,
  ApiCreatedResponse,
  ApiInternalServerErrorResponse,
  ApiNotFoundResponse,
  ApiOkResponse,
  ApiOperation,
  ApiParam,
  ApiUnauthorizedResponse,
} from '@nestjs/swagger';
import { Observable } from 'rxjs';
import { ValidateUUID } from '../../../common/validation/uuid.dto';
import { PhoneDto } from '../../../common/validation/phone.dto';
import { statusMessages } from '../../../common/messages/status.message';

@ApiOkResponse({ description: statusMessages.fa['200'] })
@ApiUnauthorizedResponse({ description: statusMessages.fa['401'] })
@ApiInternalServerErrorResponse({ description: statusMessages.fa['500'] })
@Controller('core/users')
export class UsersController {
  constructor(private readonly coreService: CoreService) {}

  // send request to create user in core microservice
  @Post()
  @ApiCreatedResponse({
    description: statusMessages.fa['201'],
  })
  @ApiConflictResponse({ description: statusMessages.fa['404'] })
  @ApiBadRequestResponse({ description: statusMessages.fa['400'] })
  create(@Body() data: UserValidator): Observable<unknown> {
    return this.coreService.send('USER:CREATE', data);
  }

  // send request to find all in core microservice
  @Get()
  findAll() {
    return this.coreService.send('USER:FIND');
    // return 'AMIN';
  }

  // send request to find user by phone number in core microservice
  @Get('by/phone/:phone')
  findByPhone(@Param() param: PhoneDto): Observable<unknown> {
    return this.coreService.send('USER:PHONE', param.phone);
  }

  @Get(':id')
  @ApiNotFoundResponse({ description: statusMessages.fa['404'] })
  findOne(@Param() data: ValidateUUID) {
    return this.coreService.send('USER:ONE', data);
  }

  @Patch()
  update(@Body() data: UserUpdateValidator) {
    return this.coreService.send('USER:UPDATE', data);
  }

  @Delete()
  delete(@Body() data: ValidateUUID) {
    return this.coreService.send('USER:DELETE', data);
  }
}
