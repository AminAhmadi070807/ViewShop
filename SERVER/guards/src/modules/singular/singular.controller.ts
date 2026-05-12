import { Controller } from '@nestjs/common';
import { MessagePattern, Payload } from '@nestjs/microservices';
import { SingularService } from './singular.service';
import { SingularDto } from './dto/singular.dto';
import { UpdateSingularDto } from './dto/update-singular.dto';

@Controller()
export class SingularController {
  constructor(private readonly singularService: SingularService) {}

  @MessagePattern('createSingular')
  create(@Payload() createSingularDto: SingularDto) {
    return this.singularService.create(createSingularDto);
  }

  @MessagePattern('findAllSingular')
  findAll() {
    return this.singularService.findAll();
  }

  @MessagePattern('findOneSingular')
  findOne(@Payload() id: number) {
    return this.singularService.findOne(id);
  }

  @MessagePattern('updateSingular')
  update(@Payload() updateSingularDto: UpdateSingularDto) {
    return this.singularService.update(updateSingularDto.id, updateSingularDto);
  }

  @MessagePattern('removeSingular')
  remove(@Payload() id: number) {
    return this.singularService.remove(id);
  }
}
