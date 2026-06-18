import { Injectable } from '@nestjs/common';
import { CommentDto } from './dto/comment.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

@Injectable()
export class CommentService {
  constructor(
    @InjectRepository(Comment)
    private readonly commentRepository: Repository<Comment>,
  ) {}

  create(data: CommentDto) {}

  findAll() {
    return `This action returns all comment`;
  }

  findOne(id: number) {
    return `This action returns a #${id} comment`;
  }

  update(data: CommentDto) {
    return `This action updates a #${data} comment`;
  }

  remove(id: number) {
    return `This action removes a #${id} comment`;
  }
}
