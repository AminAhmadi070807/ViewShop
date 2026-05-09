import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { SmsDto } from '../validations/sms.dto';
import { CustomException } from '../exceptions/custom.exception.error';

@Injectable()
export class SmsService {
  constructor(private readonly config: ConfigService) {}

  async Mediana(data: SmsDto) {
    const response: Response = await fetch(
      'https://api.mediana.ir/sms/v1/send/otp',
      {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'x-api-key': this.config.get<string>('SMS_MEDIANA_API_KEY') as string,
        },
        body: JSON.stringify({
          patternCode: this.config.get<string>('SMS_MEDIANA_PATTERN_KEY'),
          recipient: data.phone,
          otpCode: data.code,
        }),
      },
    );

    if (response.status === 200) {
      return {
        status: 200,
        message: 'ارسال پیامک موفقیت امیز بود',
      };
    }

    return {
      status: response.status,
      message: response.statusText,
    };
  }

  async FarazSms(data: SmsDto) {}

  async SmsIr(data: SmsDto) {
    const response: Response = await fetch(
      'https://api.sms.ir/v1/send/verify',
      {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Accept: 'text/plain',
          'x-api-key': this.config.get<string>('SMS_IR_API_KEY') as string,
        },
        body: JSON.stringify({
          mobile: data.phone,
          templateId: this.config.get<string>('SMS_IR_TEMPLATE_ID'),
          parameters: [
            {
              name: 'OTP',
              value: data.code,
            },
          ],
        }),
      },
    );

    const result: { status: number; message: string } =
      (await response.json()) as { status: number; message: string };

    if (response.status === 200) {
      return {
        status: 200,
        message: 'ارسال پیام موفقیت امیز بود',
      };
    }

    throw new CustomException(result.message, response.status);
  }
}
