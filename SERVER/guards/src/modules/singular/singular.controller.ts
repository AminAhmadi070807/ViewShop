import { Controller } from '@nestjs/common';
import { MessagePattern, Payload } from '@nestjs/microservices';
import { SingularService } from './singular.service';
import { SingularDto } from './dto/singular.dto';
import { ValidateUUID } from '../../common/validations/id.dto';

@Controller()
export class SingularController {
  constructor(private readonly singularService: SingularService) {}

  @MessagePattern('SINGULAR:CREATE')
  create(@Payload() createSingularDto: SingularDto) {
    return this.singularService.create(createSingularDto);
  }

  @MessagePattern('SINGULAR:FIND')
  findAll() {
    return this.singularService.findAll();
  }

  @MessagePattern('SINGULAR:DELETE')
  remove(@Payload() data: ValidateUUID) {
    return this.singularService.remove(data);
  }
}
