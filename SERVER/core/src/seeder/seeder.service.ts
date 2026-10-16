import { Injectable, OnApplicationBootstrap } from '@nestjs/common';
import { SmsSettingSeeder } from './setting/sms/sms.setting.seeder.service';

@Injectable()
export class SeederService implements OnApplicationBootstrap {
  constructor(private readonly smsSettingSeeder: SmsSettingSeeder) {}

  async onApplicationBootstrap() {
    await this.smsSettingSeeder.seeder();
  }
}
