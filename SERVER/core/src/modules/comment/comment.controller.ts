import { Controller } from '@nestjs/common';
import { MessagePattern, Payload } from '@nestjs/microservices';
import { CommentService } from './comment.service';
import { CommentDto } from './dto/comment.dto';
import { UpdateCommentDto } from './dto/update-comment.dto';

@Controller()
export class CommentController {
  constructor(private readonly commentService: CommentService) {}

  @MessagePattern('createComment')
  create(@Payload() createCommentDto: CommentDto) {
    return this.commentService.create(createCommentDto);
  }

  @MessagePattern('findAllComment')
  findAll() {
    return this.commentService.findAll();
  }

  @MessagePattern('findOneComment')
  findOne(@Payload() id: number) {
    return this.commentService.findOne(id);
  }

  @MessagePattern('updateComment')
  update(@Payload() updateCommentDto: UpdateCommentDto) {
    return this.commentService.update(updateCommentDto.id, updateCommentDto);
  }

  @MessagePattern('removeComment')
  remove(@Payload() id: number) {
    return this.commentService.remove(id);
  }
}
