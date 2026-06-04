import { Body, Controller, Delete, Get, Param, Post } from '@nestjs/common';
import { PaymentService } from '../../payment.service';
import { FindValidationDto, ValidationDto } from './validation.dto';
import { ValidateUUID } from '../../../common/validation/uuid.dto';

@Controller('payment/validation')
export class ValidationController {
  constructor(private readonly paymentService: PaymentService) {}

  @Post()
  create(@Body() data: ValidationDto) {
    return this.paymentService.send('VALIDATION:CREATE', data);
  }

  @Get()
  findAll(@Body() data: FindValidationDto) {
    return this.paymentService.send('VALIDATION:FIND', data);
  }

  @Get('/:id')
  findOne(@Param() data: ValidateUUID) {
    return this.paymentService.send('VALIDATION:ONE', data);
  }

  @Delete('/:id')
  remove(@Param() data: ValidateUUID) {
    return this.paymentService.send('VALIDATION:DELETE', data);
  }
}
