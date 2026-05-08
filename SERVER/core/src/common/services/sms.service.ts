import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { SmsDto } from '../validations/sms.dto';
import { CustomException } from '../exceptions/custom.exception.error';

@Injectable()
export class SmsService {
  constructor(private readonly config: ConfigService) {}

  Mediana(data: SmsDto) {}

  FarazSms(data: SmsDto) {}

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
          templateId: '439538',
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
