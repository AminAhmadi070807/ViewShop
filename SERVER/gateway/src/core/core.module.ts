import { Module } from '@nestjs/common';
import { CoreService } from './core.service';
import { ClientsModuleConfig } from '../common/config/client.config';
import { ClientsModule } from '@nestjs/microservices';
import { UsersController } from './controllers/users/user.controller';
import { AuthController } from './controllers/auth/auth.controller';
import { PassportModule } from '@nestjs/passport';
import { JwtModule } from '@nestjs/jwt';
import { JwtAccessTokenModuleConfig } from '../common/config/jwt.config';
import { JwtAccessTokenStrategy } from '../common/strategies/jwt.access.token.strategy';
import { JwtRefreshTokenStrategy } from '../common/strategies/jwt.refresh.token.strategy';
import { AddressController } from './controllers/address/address.controller';
import { MediaController } from './controllers/uploads/media.controller';
import { CategoryController } from './controllers/categories/category/category.controller';
import { SubCategoryController } from './controllers/categories/subCategory/sub.category.controller';
import { AttributeController } from './controllers/categories/attribute/attribute.controller';
import { ParentProductController } from './controllers/products/parent/parent.product.controller';
import { StoreController } from './controllers/store/store.controller';
import { ProductController } from './controllers/products/product/product.controller';
import { CommentController } from './controllers/comments/comment.controller';
import { StoryController } from './controllers/story/story.controller';
import { ArticleController } from './controllers/articles/article.controller';
import { CartController } from './controllers/cart/cart.controller';

@Module({
  providers: [CoreService, JwtRefreshTokenStrategy, JwtAccessTokenStrategy],
  imports: [
    ClientsModule.registerAsync(ClientsModuleConfig),
    PassportModule,
    JwtModule.registerAsync(JwtAccessTokenModuleConfig),
  ],
  controllers: [
    UsersController,
    AuthController,
    AddressController,
    MediaController,
    CategoryController,
    SubCategoryController,
    AttributeController,
    ParentProductController,
    StoreController,
    ProductController,
    CommentController,
    StoryController,
    ArticleController,
    CartController,
  ],
  exports: [CoreService],
})
export class CoreModule {}
