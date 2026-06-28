import { Controller } from '@nestjs/common';
import { MessagePattern, Payload } from '@nestjs/microservices';
import { LikeService } from './like.service';
import { LikeDto } from './dto/like.dto';

@Controller()
export class LikeController {
  constructor(private readonly likeService: LikeService) {}

  @MessagePattern('createLike')
  create(@Payload() createLikeDto: LikeDto) {
    return this.likeService.create(createLikeDto);
  }

  @MessagePattern('findAllLike')
  findAll() {
    return this.likeService.findAll();
  }

  @MessagePattern('findOneLike')
  findOne(@Payload() id: number) {
    return this.likeService.findOne(id);
  }
}
