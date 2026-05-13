import { Controller } from '@nestjs/common';
import { MessagePattern, Payload } from '@nestjs/microservices';
import { GuardsService } from './guards.service';
import { GuardDto, ValidateGuard } from './dto/guard.dto';
import { ValidateUUID } from '../../common/validations/id.dto';

@Controller()
export class GuardsController {
  constructor(private readonly guardsService: GuardsService) {}

  @MessagePattern('GUARD:CREATE')
  create(@Payload() createGuardDto: GuardDto) {
    return this.guardsService.create(createGuardDto);
  }

  @MessagePattern('GUARD:FIND')
  findAll(@Payload() role?: string) {
    return this.guardsService.findAll(role);
  }

  @MessagePattern('GUARD:ONE')
  findOne(@Payload() data: ValidateUUID) {
    return this.guardsService.findOne(data.id);
  }

  @MessagePattern('GUARD:VALIDATE')
  validate(@Payload() data: ValidateGuard) {
    return this.guardsService.validate(data);
  }

  @MessagePattern('GUARD:UPDATE')
  update(@Payload() data: GuardDto) {
    return this.guardsService.update(data);
  }

  @MessagePattern('GUARD:DELETE')
  remove(@Payload() id: number) {
    return this.guardsService.remove(id);
  }
}
