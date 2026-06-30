import { Controller } from '@nestjs/common';
import { MessagePattern, Payload } from '@nestjs/microservices';
import { TargetService } from './target.service';
import { TargetDto, UpdateTargetDto } from './dto/target.dto';
import { ValidateUUID } from '../../common/validations/id.dto';

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
  findOne(@Payload() data: ValidateUUID) {
    return this.targetService.findOne(data.id);
  }

  @MessagePattern('updateTarget')
  update(@Payload() data: UpdateTargetDto) {
    return this.targetService.update(data);
  }

  @MessagePattern('removeTarget')
  remove(@Payload() data: ValidateUUID) {
    return this.targetService.remove(data.id);
  }
}
