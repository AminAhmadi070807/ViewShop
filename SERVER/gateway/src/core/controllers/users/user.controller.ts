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
  ApiForbiddenResponse,
  ApiInternalServerErrorResponse,
  ApiNotFoundResponse,
  ApiOkResponse,
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

  @Post()
  @ApiCreatedResponse({ description: statusMessages.fa['201'] })
  @ApiBadRequestResponse({ description: statusMessages.fa['400'] })
  @ApiUnauthorizedResponse({ description: statusMessages.fa['401'] })
  @ApiForbiddenResponse({ description: statusMessages.fa['403'] })
  @ApiConflictResponse({ description: statusMessages.fa['404'] })
  @ApiConflictResponse({ description: statusMessages.fa['409'] })
  create(@Body() data: UserValidator): Observable<unknown> {
    return this.coreService.send('USER:CREATE', data);
  }

  @Get()
  findAll() {
    return this.coreService.send('USER:FIND');
  }

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
