import { InjectRepository } from '@nestjs/typeorm';
import { SmsSetting } from '../../sms-setting/entities/sms-setting.entity';
import { Repository } from 'typeorm';
import { CustomException } from '../../../common/exceptions/custom.exception.error';
import { statusMessages } from '../../../common/message/message.status';
import { SmsServiceEnum } from '../../../common/enums/sms/sms.enum';
import { OnModuleInit } from '@nestjs/common';

export class FarazSmsService implements OnModuleInit {
  api: string;
  key: string;
  pattern_key: string;
  from_number: string;
  line_number: string;
  attribute: string;

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
          Accept: 'application/json',
          'Api-Key': this.key,
        },
        body: JSON.stringify({
          code: this.pattern_key,
          attributes: { [this.attribute]: message },
          from_number: this.from_number,
          recipient: cell_phone,
          line_number: this.line_number,
          number_format: 'english',
        }),
      });

      if (response.status !== 200) {
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
        service: SmsServiceEnum.MEDIANA,
        active: true,
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
          case 'from_number':
            this.from_number = item.value;
            break;
          case 'line_number':
            this.line_number = item.value;
            break;
          case 'attribute':
            this.attribute = item.value;
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
