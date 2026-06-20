import { Controller } from '@nestjs/common';
import { MessagePattern, Payload } from '@nestjs/microservices';
import { ArticlesService } from './articles.service';
import { CreateArticleDto } from './dto/create-article.dto';
import { UpdateArticleDto } from './dto/update-article.dto';

@Controller()
export class ArticlesController {
  constructor(private readonly articlesService: ArticlesService) {}

  @MessagePattern('createArticle')
  create(@Payload() createArticleDto: CreateArticleDto) {
    return this.articlesService.create(createArticleDto);
  }

  @MessagePattern('findAllArticles')
  findAll() {
    return this.articlesService.findAll();
  }

  @MessagePattern('findOneArticle')
  findOne(@Payload() id: number) {
    return this.articlesService.findOne(id);
  }

  @MessagePattern('updateArticle')
  update(@Payload() updateArticleDto: UpdateArticleDto) {
    return this.articlesService.update(updateArticleDto.id, updateArticleDto);
  }

  @MessagePattern('removeArticle')
  remove(@Payload() id: number) {
    return this.articlesService.remove(id);
  }
}
