import { Controller } from '@nestjs/common';
import { MessagePattern, Payload } from '@nestjs/microservices';
import { ColorsService } from './colors.service';
import { CreateColorDto } from './dto/create-color.dto';
import { UpdateColorDto } from './dto/update-color.dto';

@Controller()
export class ColorsController {
  constructor(private readonly colorsService: ColorsService) {}

  @MessagePattern('COLOR:CREATE')
  create(@Payload() createColorDto: CreateColorDto) {
    return this.colorsService.create(createColorDto);
  }

  @MessagePattern('COLOR:FIND')
  findAll() {
    return this.colorsService.findAll();
  }

  @MessagePattern('COLOR:ONE')
  findOne(@Payload() id: number) {
    return this.colorsService.findOne(id);
  }

  @MessagePattern('COLOR:UPDATE')
  update(@Payload() updateColorDto: UpdateColorDto) {
    return this.colorsService.update(updateColorDto.id, updateColorDto);
  }

  @MessagePattern('COLOR:DELETE')
  remove(@Payload() id: number) {
    return this.colorsService.remove(id);
  }
}
