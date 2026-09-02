import { CustomException } from '../../../common/exceptions/custom.exception.error';
import { statusMessages } from '../../../common/message/message.status';

interface smsIr {
  status: number;
  message: string;
}

export class SmsIrService {
  api: string = 'fUq7s4bTHuN59zrhyNg0feEPoIM4vt4ypzPodlpdlglFjfYo';
  template_id: string = '439538';

  async sms(cell_phone: string, message: string) {
    try {
      const response = await fetch('https://api.sms.ir/v1/send/verify', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          ACCEPT: 'text/plain',
          'X-API-KEY': this.api,
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
}
