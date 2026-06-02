import { Controller } from '@nestjs/common';
import { MessagePattern, Payload } from '@nestjs/microservices';
import { GuardsService } from './guards.service';
import { GuardDto, ValidateGuard } from './dto/guard.dto';
import { ValidateUUID } from '../../common/validations/id.dto';
import { ValidateOptionalTitle } from '../../common/validations/title.dto';

@Controller()
export class GuardsController {
  constructor(private readonly guardsService: GuardsService) {}

  @MessagePattern('GUARD:CREATE')
  create(@Payload() createGuardDto: GuardDto) {
    return this.guardsService.create(createGuardDto);
  }

  @MessagePattern('GUARD:FIND')
  findAll(@Payload() data: ValidateOptionalTitle) {
    return this.guardsService.findAll(data);
  }

  @MessagePattern('GUARD:ONE')
  findOne(@Payload() data: ValidateUUID) {
    return this.guardsService.findOne(data.id);
  }

  @MessagePattern('GUARD:VALIDATE')
  validate(@Payload() data: ValidateGuard) {
    return this.guardsService.validate(data);
  }

  @MessagePattern('GUARD:DELETE')
  remove(@Payload() data: ValidateUUID) {
    return this.guardsService.remove(data.id);
  }
}
