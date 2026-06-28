import { Controller } from '@nestjs/common';
import { MessagePattern, Payload } from '@nestjs/microservices';
import { LikeService } from './like.service';
import { LikeDto } from './dto/like.dto';

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
  findUser(@Payload() id: string) {
    return this.likeService.findUser(id);
  }
}
