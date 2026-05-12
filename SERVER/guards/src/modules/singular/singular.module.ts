import { Module } from '@nestjs/common';
import { SingularService } from './singular.service';
import { SingularController } from './singular.controller';

@Module({
  controllers: [SingularController],
  providers: [SingularService],
})
export class SingularModule {}
