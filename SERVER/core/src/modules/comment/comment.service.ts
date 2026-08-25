import { forwardRef, Inject, Injectable } from '@nestjs/common';
import { CommentDto, UpdateCommentDto } from './dto/comment.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { IsNull, Repository } from 'typeorm';
import { CustomException } from '../../common/exceptions/custom.exception.error';
import { statusMessages } from '../../common/message/message.status';
import { ProductService } from '../products/product.service';
import { UsersService } from '../users/users.service';
import { Comment } from './entities/comment.entity';

@Injectable()
export class CommentService {
  constructor(
    @InjectRepository(Comment)
    private readonly commentRepository: Repository<Comment>,
    @Inject(forwardRef(() => ProductService))
    private readonly productService: ProductService,
    private readonly userService: UsersService,
  ) {}

  async create(data: CommentDto) {
    try {
      const user = await this.userService.findOne({
        id: data.user,
        user: data.user,
      });
      const product = await this.productService.findOne(data.product);

      if (user instanceof CustomException) return user;
      if (product instanceof CustomException) return product;

      const comment = new Comment();
      if (data.parentComment) {
        const existing = await this.commentRepository.findOneBy({
          id: data.parentComment,
        });

        if (!existing) {
          return new CustomException(statusMessages.fa['404'], 404);
        }

        comment.parentComment = existing.id;
      }

      comment.user = user.body;
      comment.description = data.description;
      comment.score = Number(data.score);
      comment.product = product.body.product;

      await this.commentRepository.save(comment);

      return { status: 201, message: statusMessages.fa['201'], body: null };
    } catch {
      throw new CustomException(statusMessages.fa['500'], 500);
    }
  }

  async findAll(page: number = 1) {
    try {
      const comments = await this.commentRepository.find({
        take: (page ?? 1) * 15,
        where: { parentComment: IsNull() },
        relations: ['user', 'product'],
        order: { createdAt: 'DESC' },
        select: {
          user: { id: true, fullName: true },
          product: { id: true, title: true, description: true },
        },
      });

      const commentsArray = [];
      for (const comment of comments) {
        const comments = await this.commentRepository.find({
          where: { parentComment: comment.id },
        });

        commentsArray.push({ ...comment, child: comments });
      }

      return {
        status: 200,
        message: statusMessages.fa['200'],
        body: commentsArray,
      };
    } catch {
      throw new CustomException(statusMessages.fa['500'], 500);
    }
  }

  async findProductComments(id: string) {
    try {
      const result = await this.commentRepository.find({
        where: { product: { id }, status: true },
      });

      return {
        status: 200,
        message: statusMessages.fa['200'],
        body: result,
      };
    } catch {
      throw new CustomException(statusMessages.fa['500'], 500);
    }
  }

  async update(data: UpdateCommentDto) {
    try {
      const result = await this.commentRepository.update(data.id, {
        status: data.status,
      });

      if (!result.affected) {
        return new CustomException(statusMessages.fa['404'], 404);
      }

      return { status: 204, message: statusMessages.fa['204'], body: null };
    } catch {
      throw new CustomException(statusMessages.fa['500'], 500);
    }
  }

  async remove(id: string) {
    try {
      const result = await this.commentRepository.delete(id);

      if (!result.affected) {
        return new CustomException(statusMessages.fa['404'], 404);
      }

      return { status: 204, message: statusMessages.fa['204'], body: null };
    } catch {
      throw new CustomException(statusMessages.fa['500'], 500);
    }
  }
}
