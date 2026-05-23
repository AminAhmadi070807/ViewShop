import { Controller } from '@nestjs/common';
import { MessagePattern, Payload } from '@nestjs/microservices';
import { AddressesService } from './addresses.service';
import { AddressDto } from './dto/address.dto';

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
  findOne(@Payload() id: number) {
    return this.addressesService.findOne(id);
  }

  @MessagePattern('ADDRESS:DELETE')
  remove(@Payload() id: number) {
    return this.addressesService.remove(id);
  }
}
