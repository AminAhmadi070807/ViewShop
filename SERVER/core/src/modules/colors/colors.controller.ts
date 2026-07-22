import { Controller } from '@nestjs/common';
import { MessagePattern, Payload } from '@nestjs/microservices';
import { ColorsService } from './colors.service';
import { ColorDto } from './dto/color.dto';
import { Validate } from '../../common/validations/validate.dto';
import { ValidateTitle } from '../../common/validations/title.dto';
import { PageFilter } from '../../common/filters/page.filter';

@Controller()
export class ColorsController {
  constructor(private readonly colorsService: ColorsService) {}

  @MessagePattern('COLOR:CREATE')
  create(@Payload() data: ColorDto) {
    return this.colorsService.create(data);
  }

  @MessagePattern('COLOR:FIND')
  findAll(@Payload() data: PageFilter) {
    return this.colorsService.findAll(data.page);
  }

  @MessagePattern('COLOR:ONE')
  findOne(@Payload() data: Validate) {
    return this.colorsService.findOne(data.id);
  }

  @MessagePattern('COLOR:SEARCH')
  search(@Payload() data: ValidateTitle) {
    return this.colorsService.search(data.title);
  }

  @MessagePattern('COLOR:DELETE')
  remove(@Payload() data: Validate) {
    return this.colorsService.remove(data.id);
  }
}
