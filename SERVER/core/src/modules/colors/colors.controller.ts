import { Controller } from '@nestjs/common';
import { MessagePattern, Payload } from '@nestjs/microservices';
import { ColorsService } from './colors.service';
import { ColorDto } from './dto/color.dto';
import { ValidateUUID } from '../../common/validations/id.dto';
import { ValidateTitle } from '../../common/validations/title.dto';

@Controller()
export class ColorsController {
  constructor(private readonly colorsService: ColorsService) {}

  @MessagePattern('COLOR:CREATE')
  create(@Payload() data: ColorDto) {
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

  @MessagePattern('COLOR:SEARCH')
  search(@Payload() data: ValidateTitle) {
    return this.colorsService.findOne(data.title);
  }

  @MessagePattern('COLOR:DELETE')
  remove(@Payload() data: ValidateUUID) {
    return this.colorsService.remove(data.id);
  }
}
