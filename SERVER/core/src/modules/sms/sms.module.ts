import { Module } from '@nestjs/common';
import { SmsService } from './sms.service';
import { SmsController } from './sms.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Sms } from './entities/sm.entity';

@Module({
  controllers: [SmsController],
  providers: [SmsService],
  imports: [TypeOrmModule.forFeature([Sms])],
  exports: [SmsService],
})
export class SmsModule {}
