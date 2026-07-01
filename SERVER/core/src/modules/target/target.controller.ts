import { Controller } from '@nestjs/common';
import { MessagePattern, Payload } from '@nestjs/microservices';
import { TargetService } from './target.service';
import { TargetDto, UpdateTargetDto } from './dto/target.dto';
import { ValidateUUID } from '../../common/validations/id.dto';

@Controller()
export class TargetController {
  constructor(private readonly targetService: TargetService) {}

  @MessagePattern('TARGET:CREATE')
  create(@Payload() data: TargetDto) {
    return this.targetService.create(data);
  }

  @MessagePattern('TARGET:FIND')
  findAll() {
    return this.targetService.findAll();
  }

  @MessagePattern('TARGET:ONE')
  findOne(@Payload() data: ValidateUUID) {
    return this.targetService.findOne(data.id);
  }

  @MessagePattern('TARGET:UPDATE')
  update(@Payload() data: UpdateTargetDto) {
    return this.targetService.update(data);
  }

  @MessagePattern('TARGET:DELETE')
  remove(@Payload() data: ValidateUUID) {
    return this.targetService.remove(data.id);
  }
}
