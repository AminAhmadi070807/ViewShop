import { CustomException } from '../../../common/exceptions/custom.exception.error';
import { statusMessages } from '../../../common/message/message.status';
import { OnModuleInit } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { SmsSetting } from '../../sms-setting/entities/sms-setting.entity';
import { Repository } from 'typeorm';
import { SmsServiceEnum } from '../../../common/enums/sms/sms.enum';

interface smsIr {
  status: number;
  message: string;
}

export class SmsIrService implements OnModuleInit {
  api: string;
  key: string;
  template_id: string;

  constructor(
    @InjectRepository(SmsSetting)
    private readonly smsSettingRepository: Repository<SmsSetting>,
  ) {}

  async sms(cell_phone: string, message: string) {
    try {
      const response = await fetch(this.api, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          ACCEPT: 'text/plain',
          'X-API-KEY': this.key,
        },
        body: JSON.stringify({
          mobile: cell_phone,
          templateId: this.template_id,
          parameters: [{ name: 'OTP', value: message }],
        }),
      });

      if (!response.ok) {
        return new CustomException(response.statusText, response.status);
      }

      const result: smsIr = (await response.json()) as smsIr;

      if (result.status === 200) {
        return new CustomException(result.message, response.status);
      }

      return { status: 200, message: message, body: null };
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
          case 'template_id':
            this.template_id = item.value;
            break;
          case 'key':
            this.key = item.value;
            break;
        }
      }

      if (!this.api || !this.template_id || !this.key) {
        return new CustomException(statusMessages.fa['400'], 400);
      }
    } catch {
      throw new CustomException(statusMessages.fa['500'], 500);
    }
  }
}
