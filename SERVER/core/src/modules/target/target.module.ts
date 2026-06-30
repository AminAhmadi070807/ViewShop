import { Module } from '@nestjs/common';
import { TargetService } from './target.service';
import { TargetController } from './target.controller';

@Module({
  controllers: [TargetController],
  providers: [TargetService],
})
export class TargetModule {}
