import { Module } from '@nestjs/common';
import { SettingsService } from './services/settings.service';
import { SettingsController } from './controllers/settings.controller';

@Module({
  controllers: [SettingsController],
  providers: [SettingsService],
})
export class SettingsModule {}
