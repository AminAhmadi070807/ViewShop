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
import { Roles } from '../../../common/decorators/role.decorator';
import { UserRoleEnum } from '../../../common/enums/core/users/role.enum';

@ApiOkResponse({ description: statusMessages.fa['200'] })
@ApiUnauthorizedResponse({ description: statusMessages.fa['401'] })
@ApiInternalServerErrorResponse({ description: statusMessages.fa['500'] })
@Controller('core/users')
@Roles(UserRoleEnum.ADMIN)
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
  findAll(): Observable<unknown> {
    return this.coreService.send('USER:FIND');
  }

  // send request to find user by phone number in core microservice
  @Get('by/phone/:phone')
  @ApiOperation({ description: 'دریافت کاربر با شماره تلفن' })
  @ApiParam({
    name: 'phone',
    required: true,
    type: 'string',
    description: 'شماره تلفن کاربر',
  })
  findByPhone(@Param() param: PhoneDto): Observable<unknown> {
    return this.coreService.send('USER:PHONE', param.phone);
  }

  // send request to find one user in core microservice
  @Get(':id')
  @ApiNotFoundResponse({ description: statusMessages.fa['404'] })
  @ApiOperation({ description: 'دریافت کاربر با ایدی' })
  @ApiParam({
    name: 'id',
    required: true,
    type: 'string',
    description: 'ایدی کاربر',
  })
  findOne(@Param() id: ValidateUUID): Observable<unknown> {
    return this.coreService.send('USER:ONE', id.id);
  }

  // send request to update user information with userId in core microservice
  @Patch('update/:id')
  @ApiOperation({ description: 'بروزرسانی کاربر با ایدی' })
  @ApiParam({
    name: 'id',
    required: true,
    type: 'uuid',
    description: 'ایدی کاربر',
  })
  update(
    @Param() param: ValidateUUID,
    @Body() data: UserUpdateValidator,
  ): Observable<unknown> {
    return this.coreService.send('USER:UPDATE', {
      id: param.id,
      fullName: data.fullName,
    });
  }

  // send request to remove user with userId in core microservice
  @Delete('delete/:id')
  @ApiOperation({ description: 'حذف کاربر با ایدی' })
  @ApiParam({
    name: 'id',
    required: true,
    type: 'uuid',
    description: 'ایدی کاربر',
  })
  delete(@Param() param: ValidateUUID): Observable<unknown> {
    return this.coreService.send('USER:DELETE', param.id);
  }
}
