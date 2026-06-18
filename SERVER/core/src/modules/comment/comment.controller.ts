import { Controller } from '@nestjs/common';
import { MessagePattern, Payload } from '@nestjs/microservices';
import { CommentService } from './comment.service';
import { CommentDto } from './dto/comment.dto';

@Controller()
export class CommentController {
  constructor(private readonly commentService: CommentService) {}

  @MessagePattern('COMMENT:CREATE')
  create(@Payload() data: CommentDto) {
    return this.commentService.create(data);
  }

  @MessagePattern('COMMENT:FIND')
  findAll() {
    return this.commentService.findAll();
  }

  @MessagePattern('COMMENT:FIND:PRODUCT')
  findProductComments(@Payload() id: number) {
    return this.commentService.findOne(id);
  }

  @MessagePattern('COMMENT:UPDATE')
  update(@Payload() data: CommentDto) {
    return this.commentService.update(data);
  }

  @MessagePattern('COMMENT:DELETE')
  remove(@Payload() id: number) {
    return this.commentService.remove(id);
  }
}
