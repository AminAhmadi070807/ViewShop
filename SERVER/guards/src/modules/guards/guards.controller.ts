import { Controller } from '@nestjs/common';
import { MessagePattern, Payload } from '@nestjs/microservices';
import { GuardsService } from './guards.service';
import { CreateGuardDto } from './dto/create-guard.dto';
import { UpdateGuardDto } from './dto/update-guard.dto';

@Controller()
export class GuardsController {
  constructor(private readonly guardsService: GuardsService) {}

  @MessagePattern('createGuard')
  create(@Payload() createGuardDto: CreateGuardDto) {
    return this.guardsService.create(createGuardDto);
  }

  @MessagePattern('findAllGuards')
  findAll() {
    return this.guardsService.findAll();
  }

  @MessagePattern('findOneGuard')
  findOne(@Payload() id: number) {
    return this.guardsService.findOne(id);
  }

  @MessagePattern('updateGuard')
  update(@Payload() updateGuardDto: UpdateGuardDto) {
    return this.guardsService.update(updateGuardDto.id, updateGuardDto);
  }

  @MessagePattern('removeGuard')
  remove(@Payload() id: number) {
    return this.guardsService.remove(id);
  }
}
