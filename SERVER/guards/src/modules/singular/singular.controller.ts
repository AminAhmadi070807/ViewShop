import { Controller } from '@nestjs/common';
import { MessagePattern, Payload } from '@nestjs/microservices';
import { SingularService } from './singular.service';
import { SingularDto, UpdateSingularDto } from './dto/singular.dto';
import { ValidateUUID } from '../../common/validations/id.dto';

@Controller()
export class SingularController {
  constructor(private readonly singularService: SingularService) {}

  @MessagePattern('SINGULAR:CREATE')
  create(@Payload() data: SingularDto) {
    return this.singularService.create(data);
  }

  @MessagePattern('SINGULAR:FIND')
  findAll() {
    return this.singularService.findAll();
  }

  @MessagePattern('SINGULAR:TOGGLE:ACCESS')
  togglePermission(@Payload() data: UpdateSingularDto) {
    return this.singularService.toggleAccess(data);
  }

  @MessagePattern('SINGULAR:DELETE')
  remove(@Payload() data: ValidateUUID) {
    return this.singularService.remove(data);
  }
}
