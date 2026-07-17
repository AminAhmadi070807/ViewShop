import { Module } from '@nestjs/common';
import { ColorsService } from './colors.service';
import { ColorsController } from './colors.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Color } from './entities/color.entity';

@Module({
  controllers: [ColorsController],
  providers: [ColorsService],
  imports: [TypeOrmModule.forFeature([Color])],
  exports: [ColorsService],
})
export class ColorsModule {}
