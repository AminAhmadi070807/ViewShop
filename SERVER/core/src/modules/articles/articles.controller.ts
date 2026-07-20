import { Controller } from '@nestjs/common';
import { MessagePattern, Payload } from '@nestjs/microservices';
import { ArticlesService } from './articles.service';
import {
  ArticleDto,
  UpdateArticleDto,
  UpdateArticleStatusDto,
} from './dto/article.dto';
import { ValidateUUID } from '../../common/validations/validate.dto';

@Controller()
export class ArticlesController {
  constructor(private readonly articlesService: ArticlesService) {}

  @MessagePattern('ARTICLE:CREATE')
  create(@Payload() data: ArticleDto) {
    return this.articlesService.create(data);
  }

  @MessagePattern('ARTICLE:FIND')
  findAll() {
    return this.articlesService.findAll();
  }

  @MessagePattern('ARTICLE:ONE')
  findOne(@Payload() data: ValidateUUID) {
    return this.articlesService.findOne(data.id);
  }

  @MessagePattern('ARTICLE:UPDATE')
  update(@Payload() data: UpdateArticleDto) {
    return this.articlesService.update(data);
  }

  @MessagePattern('ARTICLE:UPDATE:STATUS')
  updateStatus(@Payload() data: UpdateArticleStatusDto) {
    return this.articlesService.updateStatus(data);
  }

  @MessagePattern('ARTICLE:DELETE')
  remove(@Payload() data: ValidateUUID) {
    return this.articlesService.remove(data.id);
  }
}
