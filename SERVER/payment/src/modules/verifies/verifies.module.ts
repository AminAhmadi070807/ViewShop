import { Module } from '@nestjs/common';
import { VerifiesService } from './verifies.service';
import { VerifiesController } from './verifies.controller';

@Module({
  controllers: [VerifiesController],
  providers: [VerifiesService],
})
export class VerifiesModule {}
