import { Controller } from '@nestjs/common';
import { MessagePattern, Payload } from '@nestjs/microservices';
import { ValidationsService } from './validations.service';
import { FindValidationDto, ValidationDto } from './dto/validation.dto';

@Controller()
export class ValidationsController {
  constructor(private readonly validationsService: ValidationsService) {}

  @MessagePattern('VALIDATION:CREATE')
  create(@Payload() data: ValidationDto) {
    return this.validationsService.create(data);
  }

  @MessagePattern('VALIDATION:FIND')
  findAll(@Payload() data: FindValidationDto) {
    return this.validationsService.findAll(data);
  }

  @MessagePattern('VALIDATION:ONE')
  findOne(@Payload() id: string) {
    return this.validationsService.findOne(id);
  }

  @MessagePattern('VALIDATION:DELETE')
  remove(@Payload() id: string) {
    return this.validationsService.remove(id);
  }
}
