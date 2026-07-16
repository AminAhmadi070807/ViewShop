import { Controller } from '@nestjs/common';
import { MessagePattern, Payload } from '@nestjs/microservices';
import { ColorsService } from './colors.service';
import { CreateColorDto } from './dto/create-color.dto';
import { ValidateUUID } from '../common/validations/id.dto';

@Controller()
export class ColorsController {
  constructor(private readonly colorsService: ColorsService) {}

  @MessagePattern('COLOR:CREATE')
  create(@Payload() data: CreateColorDto) {
    return this.colorsService.create(data);
  }

  @MessagePattern('COLOR:FIND')
  findAll() {
    return this.colorsService.findAll();
  }

  @MessagePattern('COLOR:ONE')
  findOne(@Payload() data: ValidateUUID) {
    return this.colorsService.findOne(data.id);
  }

  @MessagePattern('COLOR:UPDATE')
  update(@Payload() data: CreateColorDto) {
    return this.colorsService.update(data);
  }

  @MessagePattern('COLOR:DELETE')
  remove(@Payload() data: ValidateUUID) {
    return this.colorsService.remove(data.id);
  }
}
