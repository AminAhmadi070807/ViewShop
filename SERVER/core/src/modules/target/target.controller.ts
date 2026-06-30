import { Controller } from '@nestjs/common';
import { MessagePattern, Payload } from '@nestjs/microservices';
import { TargetService } from './target.service';
import { TargetDto, UpdateTargetDto } from './dto/target.dto';

@Controller()
export class TargetController {
  constructor(private readonly targetService: TargetService) {}

  @MessagePattern('createTarget')
  create(@Payload() data: TargetDto) {
    return this.targetService.create(data);
  }

  @MessagePattern('findAllTarget')
  findAll() {
    return this.targetService.findAll();
  }

  @MessagePattern('findOneTarget')
  findOne(@Payload() id: string) {
    return this.targetService.findOne(id);
  }

  @MessagePattern('updateTarget')
  update(@Payload() data: UpdateTargetDto) {
    return this.targetService.update(data);
  }

  @MessagePattern('removeTarget')
  remove(@Payload() id: string) {
    return this.targetService.remove(id);
  }
}
