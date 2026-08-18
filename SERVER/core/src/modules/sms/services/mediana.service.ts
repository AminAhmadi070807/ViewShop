import { CustomException } from '../../../common/exceptions/custom.exception.error';
import { statusMessages } from '../../../common/message/message.status';

export class MedianaService {
  private get Headers() {
    return {
      'Content-Type': 'application/json',
      'x-api-key': process.env.SMS_MEDIANA_API_KEY as string,
    };
  }

  private Body(cell_phone: string, message: string) {
    return {
      patternCode: process.env.SMS_MEDIANA_PATTERN_KEY,
      recipient: cell_phone,
      otpCode: message,
    };
  }

  async sms(cell_phone: string, message: string) {
    try {
      const response = await fetch('https://api.mediana.ir/sms/v1/send/otp', {
        method: 'POST',
        headers: this.Headers,
        body: JSON.stringify(this.Body(cell_phone, message)),
      });

      if (!response.ok) {
        return new CustomException(response.statusText, response.status);
      }

      return {
        status: 200,
        message: statusMessages.fa['200'],
        body: null,
      };
    } catch {
      throw new CustomException(statusMessages.fa['500'], 500);
    }
  }
}
