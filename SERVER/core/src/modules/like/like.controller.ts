import { Controller } from '@nestjs/common';
import { MessagePattern, Payload } from '@nestjs/microservices';
import { LikeService } from './like.service';
import { CreateLikeDto } from './dto/create-like.dto';
import { UpdateLikeDto } from './dto/update-like.dto';

@Controller()
export class LikeController {
  constructor(private readonly likeService: LikeService) {}

  @MessagePattern('createLike')
  create(@Payload() createLikeDto: CreateLikeDto) {
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

  @MessagePattern('updateLike')
  update(@Payload() updateLikeDto: UpdateLikeDto) {
    return this.likeService.update(updateLikeDto.id, updateLikeDto);
  }

  @MessagePattern('removeLike')
  remove(@Payload() id: number) {
    return this.likeService.remove(id);
  }
}
