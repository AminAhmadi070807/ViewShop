import { Controller } from '@nestjs/common';
import { MessagePattern, Payload } from '@nestjs/microservices';
import { AddressesService } from './addresses.service';
import { AddressDto } from './dto/address.dto';
import { Validate } from '../../common/validations/validate.dto';

@Controller()
export class AddressesController {
  constructor(private readonly addressesService: AddressesService) {}

  @MessagePattern('ADDRESS:CREATE')
  create(@Payload() createAddressDto: AddressDto) {
    return this.addressesService.create(createAddressDto);
  }

  @MessagePattern('ADDRESS:FIND')
  findAll(@Payload() data: Validate) {
    console.log(data);
    return this.addressesService.findAll(data);
  }

  @MessagePattern('ADDRESS:ONE')
  findOne(@Payload() data: Validate) {
    return this.addressesService.findOne(data);
  }

  @MessagePattern('ADDRESS:DELETE')
  remove(@Payload() data: Validate) {
    return this.addressesService.remove(data);
  }
}
