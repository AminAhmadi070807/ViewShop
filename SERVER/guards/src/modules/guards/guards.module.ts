import { Module } from '@nestjs/common';
import { GuardsService } from './guards.service';
import { GuardsController } from './guards.controller';

@Module({
  controllers: [GuardsController],
  providers: [GuardsService],
})
export class GuardsModule {}
