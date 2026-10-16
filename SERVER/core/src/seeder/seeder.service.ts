import { Injectable, OnApplicationBootstrap } from '@nestjs/common';
import { SmsSettingSeeder } from './setting/sms/sms.setting.seeder.service';
import { PaymentSettingSeeder } from './setting/payment/payment.setting.seeder.service';
import { MediaSeeder } from './media/media.seeder.service';
import { SettingSeeder } from './setting/setting/setting.seeder.service';
import { UsersSeeder } from './users/users.seeder.service';

@Injectable()
export class SeederService implements OnApplicationBootstrap {
  constructor(
    private readonly smsSettingSeeder: SmsSettingSeeder,
    private readonly mediaSeeder: MediaSeeder,
    private readonly paymentSettingSeeder: PaymentSettingSeeder,
    private readonly settingSeeder: SettingSeeder,
    private readonly usersSeeder: UsersSeeder,
  ) {}

  async onApplicationBootstrap() {
    await this.smsSettingSeeder.seeder();
    await this.mediaSeeder.seeder();
    await this.paymentSettingSeeder.seeder();
    await this.settingSeeder.seeder();
    await this.usersSeeder.seeder();
  }
}
