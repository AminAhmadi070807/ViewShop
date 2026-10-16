import { Module } from '@nestjs/common';
import { UsersModule } from '../modules/users/users.module';
import { SeederService } from './seeder.service';
import { SmsSettingSeeder } from './setting/sms/sms.setting.seeder.service';
import { SmsModule } from '../modules/sms/sms.module';

@Module({
  imports: [UsersModule, SmsModule],
  providers: [SeederService, SmsSettingSeeder],
})
export class SeederModule {}
