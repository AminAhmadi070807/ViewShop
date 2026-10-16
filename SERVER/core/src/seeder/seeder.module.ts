import { Module } from '@nestjs/common';
import { UsersModule } from '../modules/users/users.module';
import { SeederService } from './seeder.service';
import { SmsSettingSeeder } from './setting/sms/sms.setting.seeder.service';
import { SmsModule } from '../modules/sms/sms.module';
import { PaymentModule } from '../modules/payment/payment.module';
import { PaymentSettingSeeder } from './setting/payment/payment.setting.seeder.service';

@Module({
  imports: [UsersModule, SmsModule, PaymentModule],
  providers: [SeederService, SmsSettingSeeder, PaymentSettingSeeder],
})
export class SeederModule {}
