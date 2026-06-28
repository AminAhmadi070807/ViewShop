import { Controller } from '@nestjs/common';
import { MessagePattern, Payload } from '@nestjs/microservices';
import { LikeService } from './like.service';
import { LikeDto } from './dto/like.dto';
import { ValidateUUID } from '../../common/validations/id.dto';

@Controller()
export class LikeController {
  constructor(private readonly likeService: LikeService) {}

  @MessagePattern('LIKE:TOGGLE')
  toggle(@Payload() data: LikeDto) {
    return this.likeService.toggle(data);
  }

  @MessagePattern('LIKE:FIND')
  findAll() {
    return this.likeService.findAll();
  }

  @MessagePattern('LIKE:USER')
  findUser(@Payload() data: ValidateUUID) {
    return this.likeService.findUser(data.id);
  }
}
