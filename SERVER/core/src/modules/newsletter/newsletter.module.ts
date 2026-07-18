import { Module } from '@nestjs/common';
import { NewsletterService } from './newsletter.service';
import { NewsletterController } from './newsletter.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Newsletter } from './entities/newsletter.entity';

@Module({
  controllers: [NewsletterController],
  providers: [NewsletterService],
  imports: [TypeOrmModule.forFeature([Newsletter])],
})
export class NewsletterModule {}
