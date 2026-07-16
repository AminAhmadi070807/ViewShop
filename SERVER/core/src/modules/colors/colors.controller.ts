import { Controller } from '@nestjs/common';
import { MessagePattern, Payload } from '@nestjs/microservices';
import { ColorsService } from './colors.service';
import { CreateColorDto } from './dto/create-color.dto';
import { UpdateColorDto } from './dto/update-color.dto';

@Controller()
export class ColorsController {
  constructor(private readonly colorsService: ColorsService) {}

  @MessagePattern('createColor')
  create(@Payload() createColorDto: CreateColorDto) {
    return this.colorsService.create(createColorDto);
  }

  @MessagePattern('findAllColors')
  findAll() {
    return this.colorsService.findAll();
  }

  @MessagePattern('findOneColor')
  findOne(@Payload() id: number) {
    return this.colorsService.findOne(id);
  }

  @MessagePattern('updateColor')
  update(@Payload() updateColorDto: UpdateColorDto) {
    return this.colorsService.update(updateColorDto.id, updateColorDto);
  }

  @MessagePattern('removeColor')
  remove(@Payload() id: number) {
    return this.colorsService.remove(id);
  }
}
