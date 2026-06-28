import { Controller } from '@nestjs/common';
import { MessagePattern, Payload } from '@nestjs/microservices';
import { LikeService } from './like.service';
import { LikeDto } from './dto/like.dto';

@Controller()
export class LikeController {
  constructor(private readonly likeService: LikeService) {}

  @MessagePattern('createLike')
  create(@Payload() data: LikeDto) {
    return this.likeService.create(data);
  }

  @MessagePattern('findAllLike')
  findAll() {
    return this.likeService.findAll();
  }

  @MessagePattern('findOneLike')
  findOne(@Payload() id: string) {
    return this.likeService.findOne(id);
  }
}
