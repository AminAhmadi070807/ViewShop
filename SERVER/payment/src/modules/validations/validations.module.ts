import { Module } from '@nestjs/common';
import { ValidationsService } from './validations.service';
import { ValidationsController } from './validations.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Validation } from './entities/validation.entity';

@Module({
  controllers: [ValidationsController],
  providers: [ValidationsService],
  imports: [TypeOrmModule.forFeature([Validation])],
})
export class ValidationsModule {}
