import { CustomException } from '../../../common/exceptions/custom.exception.error';
import { statusMessages } from '../../../common/message/message.status';
import { SmsServiceEnum } from '../../../common/enums/sms/sms.enum';
import { InjectRepository } from '@nestjs/typeorm';
import { SmsSetting } from '../../sms-setting/entities/sms-setting.entity';
import { Repository } from 'typeorm';
import { OnModuleInit } from '@nestjs/common';

export class MedianaService implements OnModuleInit {
  api: string;
  key: string;
  pattern_key: string;

  constructor(
    @InjectRepository(SmsSetting)
    private readonly smsSettingRepository: Repository<SmsSetting>,
  ) {}

  async sms(cell_phone: string, message: string) {
    try {
      const response = await fetch(this.api, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json', 'x-api-key': this.key },
        body: JSON.stringify({
          patternCode: this.pattern_key,
          recipient: cell_phone,
          otpCode: message,
        }),
      });

      if (!response.ok) {
        return new CustomException(response.statusText, response.status);
      }

      return { status: 200, message: statusMessages.fa['200'], body: null };
    } catch {
      throw new CustomException(statusMessages.fa['500'], 500);
    }
  }

  async onModuleInit() {
    try {
      const result = await this.smsSettingRepository.findOneBy({
        service: SmsServiceEnum.SMS_IR,
      });

      if (!result) {
        return new CustomException(statusMessages.fa['404'], 404);
      }

      for (const item of result.details) {
        switch (item.title) {
          case 'api':
            this.api = item.value;
            break;
          case 'pattern_key':
            this.pattern_key = item.value;
            break;
          case 'key':
            this.key = item.value;
            break;
        }
      }

      if (!this.api || !this.pattern_key || !this.key) {
        return new CustomException(statusMessages.fa['400'], 400);
      }
    } catch {
      throw new CustomException(statusMessages.fa['500'], 500);
    }
  }
}
