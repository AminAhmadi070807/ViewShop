import { Injectable, OnApplicationBootstrap } from '@nestjs/common';
import { SmsSettingSeeder } from './setting/sms/sms.setting.seeder.service';
import { PaymentSettingSeeder } from './setting/payment/payment.setting.seeder.service';

@Injectable()
export class SeederService implements OnApplicationBootstrap {
  constructor(
    private readonly smsSettingSeeder: SmsSettingSeeder,
    private readonly paymentSettingSeeder: PaymentSettingSeeder,
  ) {}

  async onApplicationBootstrap() {
    await this.smsSettingSeeder.seeder();
    // await this.paymentSettingSeeder.seeder();
  }
}
