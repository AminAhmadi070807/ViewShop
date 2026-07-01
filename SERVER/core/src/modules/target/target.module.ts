import { Module } from '@nestjs/common';
import { TargetService } from './target.service';
import { TargetController } from './target.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Target } from './entities/target.entity';

@Module({
  controllers: [TargetController],
  providers: [TargetService],
  imports: [TypeOrmModule.forFeature([Target])],
  exports: [TargetService],
})
export class TargetModule {}
