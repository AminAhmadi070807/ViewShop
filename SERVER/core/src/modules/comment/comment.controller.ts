import { Controller } from '@nestjs/common';
import { MessagePattern, Payload } from '@nestjs/microservices';
import { CommentService } from './comment.service';
import { CommentDto, UpdateCommentDto } from './dto/comment.dto';
import { Validate } from '../../common/validations/validate.dto';
import { PageFilter } from '../../common/filters/page.filter';

@Controller()
export class CommentController {
  constructor(private readonly commentService: CommentService) {}

  @MessagePattern('COMMENT:CREATE')
  create(@Payload() data: CommentDto) {
    return this.commentService.create(data);
  }

  @MessagePattern('COMMENT:FIND')
  findAll(@Payload() data: PageFilter) {
    return this.commentService.findAll(data.page);
  }

  @MessagePattern('COMMENT:UPDATE')
  update(@Payload() data: UpdateCommentDto) {
    return this.commentService.update(data);
  }

  @MessagePattern('COMMENT:DELETE')
  remove(@Payload() data: Validate) {
    return this.commentService.remove(data.id);
  }
}
