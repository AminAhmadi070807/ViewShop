import { CustomException } from '../../../common/exceptions/custom.exception.error';
import { statusMessages } from '../../../common/message/message.status';
import { ConfigService } from '@nestjs/config';

export class SmsIrService {
  constructor(private readonly configService: ConfigService) {}

  private get Headers() {
    return {
      'Content-Type': 'application/json',
      Accept: 'text/plain',
      'x-api-key': this.configService.get<string>('SMS_IR_API_KEY') as string,
    };
  }

  private Body(cell_phone: string, message: string) {
    return {
      mobile: cell_phone,
      templateId: this.configService.get<string>('SMS_IR_TEMPLATE_ID'),
      parameters: [
        {
          name: 'OTP',
          value: message,
        },
      ],
    };
  }

  async sms(cell_phone: string, message: string) {
    try {
      const response = await fetch('https://api.sms.ir/v1/send/verify', {
        method: 'POST',
        headers: this.Headers,
        body: JSON.stringify(this.Body(cell_phone, message)),
      });

      if (!response.ok) {
        return new CustomException(response.statusText, response.status);
      }

      return {
        status: 200,
        message: message,
        body: null,
      };
    } catch {
      throw new CustomException(statusMessages.fa['500'], 500);
    }
  }
}
