import { Body, Controller, Param, Post } from '@nestjs/common';
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

  @Post()
  findAll(@Body() data: FindValidationDto) {
    return this.paymentService.send('VALIDATION:FIND', data);
  }

  @Post('/:id')
  findOne(@Param() data: ValidateUUID) {
    return this.paymentService.send('VALIDATION:ONE', data);
  }

  @Post('/:id')
  remove(@Param() data: ValidateUUID) {
    return this.paymentService.send('VALIDATION:DELETE', data);
  }
}
