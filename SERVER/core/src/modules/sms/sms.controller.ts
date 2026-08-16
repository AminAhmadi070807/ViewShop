import { Controller } from '@nestjs/common';
import { MessagePattern, Payload } from '@nestjs/microservices';
import { SmsService } from './sms.service';
import { CreateSmDto } from './dto/create-sm.dto';
import { UpdateSmDto } from './dto/update-sm.dto';

@Controller()
export class SmsController {
  constructor(private readonly smsService: SmsService) {}

  @MessagePattern('createSm')
  create(@Payload() createSmDto: CreateSmDto) {
    return this.smsService.create(createSmDto);
  }

  @MessagePattern('findAllSms')
  findAll() {
    return this.smsService.findAll();
  }

  @MessagePattern('findOneSm')
  findOne(@Payload() id: number) {
    return this.smsService.findOne(id);
  }

  @MessagePattern('updateSm')
  update(@Payload() updateSmDto: UpdateSmDto) {
    return this.smsService.update(updateSmDto.id, updateSmDto);
  }

  @MessagePattern('removeSm')
  remove(@Payload() id: number) {
    return this.smsService.remove(id);
  }
}
