import { Module } from '@nestjs/common';
import { UsersModule } from './modules/users/users.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { TypeOrmModuleConfig } from './common/config/typeorm.config';
import { ConfigModule } from '@nestjs/config';
import { AuthModule } from './modules/auth/auth.module';
import { JwtModule } from '@nestjs/jwt';
import { AddressesModule } from './modules/addresses/addresses.module';
import { ProductsModule } from './modules/products/products.module';
import { CategoriesModule } from './modules/categories/categories.module';
import { MediaModule } from './modules/media/media.module';
import { ScheduleModule } from '@nestjs/schedule';
import { TasksModule } from './modules/tasks/tasks.module';
import { StoreModule } from './modules/store/store.module';
import { CommentModule } from './modules/comment/comment.module';
import { StoryModule } from './modules/story/story.module';
import { ArticlesModule } from './modules/articles/articles.module';
import { CartModule } from './modules/cart/cart.module';
import { OrderModule } from './modules/order/order.module';
import { LikeModule } from './modules/like/like.module';
import { SearchModule } from './modules/search/search.module';
import { TicketsModule } from './modules/tickets/tickets.module';
import { BrandsModule } from './modules/brands/brands.module';
import { ReportsModule } from './modules/reports/reports.module';
import { TargetModule } from './modules/target/target.module';
import { WishlistModule } from './modules/wishlist/wishlist.module';
import { PaymentModule } from './modules/payment/payment.module';
import { WalletModule } from './modules/wallet/wallet.module';
import { ColorsModule } from './modules/colors/colors.module';
import { NewsletterModule } from './modules/newsletter/newsletter.module';
import { FiltersModule } from './modules/filters/filters.module';
import { MenusModule } from './modules/menus/menus.module';
import { SettingsModule } from './modules/settings/settings.module';
import { SalesModule } from './modules/sales/sales.module';
import { SmsModule } from './modules/sms/sms.module';
import { SpecificationModule } from './modules/specification/specification.module';
import { SmsSettingModule } from './modules/sms-setting/sms-setting.module';

@Module({
  imports: [
    TypeOrmModule.forRootAsync(TypeOrmModuleConfig),
    JwtModule.register({ global: true }),
    ConfigModule.forRoot({ isGlobal: true }),
    AuthModule,
    AddressesModule,
    UsersModule,
    ProductsModule,
    CategoriesModule,
    MediaModule,
    ScheduleModule.forRoot(),
    TasksModule,
    StoreModule,
    CommentModule,
    StoryModule,
    ArticlesModule,
    CartModule,
    OrderModule,
    LikeModule,
    SearchModule,
    TicketsModule,
    BrandsModule,
    ReportsModule,
    TargetModule,
    WishlistModule,
    PaymentModule,
    WalletModule,
    ColorsModule,
    NewsletterModule,
    FiltersModule,
    MenusModule,
    SettingsModule,
    SalesModule,
    SmsModule,
    SpecificationModule,
    SmsSettingModule,
  ],
})
export class AppModule {}
