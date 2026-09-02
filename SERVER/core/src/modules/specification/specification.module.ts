import { Module } from '@nestjs/common';
import { SpecificationService } from './specification.service';
import { SpecificationController } from './specification.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Specification } from './entities/specification.entity';

@Module({
  controllers: [SpecificationController],
  providers: [SpecificationService],
  imports: [TypeOrmModule.forFeature([Specification])],
  exports: [SpecificationService],
})
export class SpecificationModule {}
