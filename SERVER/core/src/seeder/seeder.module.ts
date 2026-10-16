import { Module } from '@nestjs/common';
import { UsersModule } from '../modules/users/users.module';
import { SeederService } from './seeder.service';
import { SmsSettingSeeder } from './setting/sms/sms.setting.seeder.service';
import { SmsModule } from '../modules/sms/sms.module';
import { PaymentModule } from '../modules/payment/payment.module';
import { PaymentSettingSeeder } from './setting/payment/payment.setting.seeder.service';
import { MediaModule } from '../modules/media/media.module';
import { MediaSeeder } from './media/media.seeder.service';
import { SettingsModule } from '../modules/settings/settings.module';
import { SettingSeeder } from './setting/setting/setting.seeder.service';
import { UsersSeeder } from './users/users.seeder.service';
import { MenuSeeder } from './menu/menu.seeder.service';
import { MenusModule } from '../modules/menus/menus.module';

@Module({
  imports: [
    UsersModule,
    SmsModule,
    PaymentModule,
    MediaModule,
    SettingsModule,
    MenusModule,
  ],
  providers: [
    SeederService,
    SmsSettingSeeder,
    PaymentSettingSeeder,
    MediaSeeder,
    SettingSeeder,
    UsersSeeder,
    MenuSeeder,
  ],
})
export class SeederModule {}
