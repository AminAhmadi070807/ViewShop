import { HttpStatus, Injectable } from '@nestjs/common';
import { CommentDto } from './dto/comment.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { IsNull, Repository } from 'typeorm';
import { CustomException } from '../../common/exceptions/custom.exception.error';
import { statusMessages } from '../../common/message/message.status';
import { ProductService } from '../products/product/product.service';
import { UsersService } from '../users/users.service';
import { RpcException } from '@nestjs/microservices';
import { Comment } from './entities/comment.entity';

@Injectable()
export class CommentService {
  constructor(
    @InjectRepository(Comment)
    private readonly commentRepository: Repository<Comment>,
    private readonly productService: ProductService,
    private readonly userService: UsersService,
  ) {}

  async create(data: CommentDto) {
    try {
      const user = await this.userService.findOne(data.user);
      const product = await this.productService.findOne(data.product);

      if (user.status !== HttpStatus.OK || product instanceof RpcException) {
        return new CustomException(statusMessages.fa['404'], 404);
      }

      const comment = new Comment();
      if (data.parentComment) {
        const existing: Comment | null = await this.commentRepository.findOneBy(
          {
            id: data.parentComment,
          },
        );

        if (!existing) {
          return new CustomException(statusMessages.fa['404'], 404);
        }

        comment.parentComment = existing;
      }

      comment.user = user.body;
      comment.description = data.description;
      comment.score = Number(data.score);

      await this.commentRepository.save(comment);

      return {
        status: 201,
        message: statusMessages.fa['201'],
        body: null,
      };
    } catch {
      throw new CustomException(statusMessages.fa['500'], 500);
    }
  }

  async findAll() {
    try {
      const comments: Comment[] = await this.commentRepository.find({
        where: {
          parentComment: IsNull(),
        },
        relations: ['user', 'parentComment', 'product'],
        order: {
          createdAt: 'DESC',
        },
        select: {
          id: true,
          user: {
            id: true,
            fullName: true,
          },
          parentComment: {
            id: true,
            description: true,
            score: true,
            user: {
              id: true,
              fullName: true,
            },
          },
          product: {
            id: true,
          },
          status: true,
          description: true,
          score: true,
        },
      });

      return {
        status: 200,
        message: statusMessages.fa['200'],
        body: comments,
      };
    } catch {
      throw new CustomException(statusMessages.fa['500'], 500);
    }
  }

  async findProductComments(id: string) {
    try {
      const comments: Comment[] = await this.commentRepository.find({
        where: {
          product: {
            id,
          },
          parentComment: IsNull(),
        },
        relations: ['user', 'parentComment', 'product'],
        order: {
          createdAt: 'DESC',
        },
        select: {
          id: true,
          user: {
            id: true,
            fullName: true,
          },
          parentComment: {
            id: true,
            description: true,
            score: true,
            user: {
              id: true,
              fullName: true,
            },
          },
          product: {
            id: true,
          },
          status: true,
          description: true,
          score: true,
        },
      });

      return {
        status: 200,
        message: statusMessages.fa['200'],
        body: comments,
      };
    } catch {
      throw new CustomException(statusMessages.fa['500'], 500);
    }
  }

  async update(data: UpdateCommentStatus) {}

  remove(id: number) {
    return `This action removes a #${id} comment`;
  }
}
