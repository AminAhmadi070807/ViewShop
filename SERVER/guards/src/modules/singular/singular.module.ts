import { Module } from '@nestjs/common';
import { SingularService } from './singular.service';
import { SingularController } from './singular.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Singular } from './entities/singular.entity';

@Module({
  controllers: [SingularController],
  providers: [SingularService],
  imports: [TypeOrmModule.forFeature([Singular])],
})
export class SingularModule {}
