import { Controller } from '@nestjs/common';
import { MessagePattern, Payload } from '@nestjs/microservices';
import { AddressesService } from './addresses.service';
import { AddressDto } from './dto/address.dto';
import { ValidateUUID } from '../../common/validations/validate.dto';

@Controller()
export class AddressesController {
  constructor(private readonly addressesService: AddressesService) {}

  @MessagePattern('ADDRESS:CREATE')
  create(@Payload() createAddressDto: AddressDto) {
    return this.addressesService.create(createAddressDto);
  }

  @MessagePattern('ADDRESS:FIND')
  findAll() {
    return this.addressesService.findAll();
  }

  @MessagePattern('ADDRESS:ONE')
  findOne(@Payload() data: ValidateUUID) {
    return this.addressesService.findOne(data.id);
  }

  @MessagePattern('ADDRESS:DELETE')
  remove(@Payload() data: ValidateUUID) {
    return this.addressesService.remove(data.id);
  }
}
