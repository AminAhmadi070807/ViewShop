import { Controller } from '@nestjs/common';
import { MessagePattern, Payload } from '@nestjs/microservices';
import { GuardsService } from './guards.service';
import { CreateGuardDto } from './dto/create-guard.dto';
import { UpdateGuardDto } from './dto/update-guard.dto';

@Controller()
export class GuardsController {
  constructor(private readonly guardsService: GuardsService) {}

  @MessagePattern('GUARD:CREATE')
  create(@Payload() createGuardDto: CreateGuardDto) {
    return this.guardsService.create(createGuardDto);
  }

  @MessagePattern('GUARD:FIND')
  find() {
    return this.guardsService.findAll();
  }

  @MessagePattern('GUARD:VALIDATE')
  validate() {
    return this.guardsService.findAll();
  }

  @MessagePattern('GUARD:UPDATE')
  update(@Payload() updateGuardDto: UpdateGuardDto) {
    return this.guardsService.update(updateGuardDto.id, updateGuardDto);
  }

  @MessagePattern('GUARD:DELETE')
  remove(@Payload() id: number) {
    return this.guardsService.remove(id);
  }
}
