import { Module } from '@nestjs/common';
import { SmsService } from './sms.service';
import { SmsController } from './sms.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Sms } from './entities/sm.entity';
import { FarazSmsService } from './services/faraz-sms.service';
import { MedianaService } from './services/mediana.service';
import { SmsIrService } from './services/sms-ir.service';

@Module({
  controllers: [SmsController],
  providers: [SmsService, FarazSmsService, MedianaService, SmsIrService],
  imports: [TypeOrmModule.forFeature([Sms])],
  exports: [SmsService],
})
export class SmsModule {}
