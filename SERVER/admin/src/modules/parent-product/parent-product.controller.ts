import { Controller } from '@nestjs/common';
import { MessagePattern, Payload } from '@nestjs/microservices';
import { CoreService } from '../../core/core.service';
import { ValidateUUID } from '../../common/validations/uuid.dto';

@Controller()
export class ParentProductController {
  constructor(private readonly coreService: CoreService) {}

  @MessagePattern('PRODUCT:PARENT:CREATE')
  create(@Payload() data: unknown) {
    return this.coreService.send('PRODUCT:PARENT:CREATE', data);
  }

  @MessagePattern('PRODUCT:PARENT:FIND')
  findAll() {
    return this.coreService.send('PRODUCT:PARENT:FIND');
  }

  @MessagePattern('PRODUCT:PARENT:UPDATE')
  findOne(@Payload() data: ValidateUUID) {
    return this.coreService.send('PRODUCT:PARENT:ONE', data);
  }

  @MessagePattern('PRODUCT:PARENT:FIND')
  update(@Payload() data: unknown) {
    return this.coreService.send('PRODUCT:PARENT:UPDATE', data);
  }

  @MessagePattern('PRODUCT:PARENT:FIND')
  remove(@Payload() data: ValidateUUID) {
    return this.coreService.send('PRODUCT:PARENT:DELETE', data);
  }
}
