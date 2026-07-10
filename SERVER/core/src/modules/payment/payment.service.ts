import { HttpStatus, Injectable } from '@nestjs/common';
import { ZarinPalDto } from './dto/payment.dto';
import { CustomException } from '../../common/exceptions/custom.exception.error';
import { ConfigService } from '@nestjs/config';
import { InjectRepository } from '@nestjs/typeorm';
import { Payment } from './entities/payment.entity';
import { Repository } from 'typeorm';
import { Validation } from '../validations/entities/validation.entity';
import { PaymentModelEnum } from '../../common/enums/payment/ipg.enum';
import {
  SendRequestInterface,
  ZarinPalInterface,
} from '../../common/interfaces/payment.interface';
import { statusMessages } from '../../common/message/message.status';
import { PaymentStatusEnum } from '../../common/enums/payment/status.enum';

@Injectable()
export class PaymentService {
  constructor(
    private readonly config: ConfigService,
    @InjectRepository(Payment)
    private readonly paymentRepository: Repository<Payment>,
    @InjectRepository(Validation)
    private readonly validationRepository: Repository<Validation>,
  ) {}

  private paymentRequestData(data: SendRequestInterface): object {
    let requestBody;

    if (data.model === PaymentModelEnum.ZARIN_PAL) {
      requestBody = {
        amount: data.amount,
        description: data.description,
        merchant_id: data.merchant,
        callback_url: data.callbackUrl + 'zarin_pal',
      };
    } else if (data.model === PaymentModelEnum.ZIBAL) {
      requestBody = {
        amount: data.amount,
        description: data.description,
        merchant: data.merchant,
        callbackUrl: data.callbackUrl + 'zibal',
      };
    } else {
      requestBody = {};
    }

    return requestBody;
  }

  private verifyBody(data: { model: PaymentModelEnum; data: object }) {
    const body = new Map(Object.entries(data.data));

    if (data.model === PaymentModelEnum.ZARIN_PAL) {
      return {
        status: body.get('code') as number,
        model: data.model,
      };
    } else if (data.model === PaymentModelEnum.ZIBAL) {
      return {
        status: body.get('result') as number,
        model: data.model,
      };
    } else {
      return {
        status: 500,
        model: data.model,
      };
    }
  }

  private async send(data: SendRequestInterface) {
    const reqData: object = this.paymentRequestData(data);

    const request: Response = await fetch(data.url, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(reqData),
    });

    if (request.status !== 200) {
      return {
        status: request.status,
        message: 'خطا در ارتباط با درگاه پرداخت',
        body: null,
      };
    }

    const body: object = (await request.json()) as object;

    const resultBody = this.verifyBody({ model: data.model, data: body });

    if (resultBody.status === 500) {
      return {
        status: 422,
        message: 'ارتباط با سرویس پرداخت مجاز نیست لطفا بعدا امتحان فرماید',
        body: null,
      };
    }

    const result: Validation | null = await this.validationRepository.findOneBy(
      {
        IPG: data.model,
        statusCode: resultBody.status,
      },
    );

    if (!result) {
      return {
        status: 402,
        message: statusMessages.fa['409'],
        body: null,
      };
    }
    if (result.status !== PaymentStatusEnum.SUCCESS) {
      return {
        status: 402,
        message: result.description,
        body: null,
      };
    }

    return {
      status: 200,
      message: 'ارتباط با درگاه پرداخت موفق امیز بود',
      body,
    };
  }

  async zarinPal(data: ZarinPalDto) {
    const url = this.config.get<string>('ZARIN_PAL_REQUEST') as string;
    const merchant = this.config.get<string>('ZARIN_PAL_MERCHANT') as string;
    const callbackUrl = this.config.get<string>(
      'PAYMENT_CALLBACK_URL',
      '/api/v1/payment/verify',
    );

    const paymentData = (await this.send({
      merchant,
      amount: data.amount,
      description: data.description,
      callbackUrl: callbackUrl,
      url: url,
      model: PaymentModelEnum.ZARIN_PAL,
    })) as {
      status: HttpStatus;
      message: string;
      body: ZarinPalInterface;
    };

    if (paymentData.status !== HttpStatus.OK) {
      throw new CustomException(paymentData.message, paymentData.status);
    }

    const payment: Payment = this.paymentRepository.create({
      user: data.user,
      IPG: PaymentModelEnum.ZARIN_PAL,
      amount: data.amount,
      authority: paymentData.body.data.authority,
    });

    await this.paymentRepository.save(payment);

    return {
      status: 200,
      message: statusMessages.fa['200'],
      body: {
        route: `https://${process.env.NODE_ENV === 'development' ? 'sandbox' : 'payment'}.zarinpal.com/pg/StartPay/${paymentData.body.data.authority}`,
      },
    };
  }

  async zibal(data: ZarinPalDto) {
    const url = this.config.get<string>('ZIBAL_PAL_REQUEST') as string;
    const merchant = this.config.get<string>('ZIBAL_PAL_MERCHANT') as string;
    const callbackUrl: string = this.config.get<string>(
      'PAYMENT_CALLBACK_URL',
      '/api/v1/payment/verify',
    );

    const paymentData = (await this.send({
      merchant,
      amount: data.amount,
      description: data.description,
      callbackUrl: callbackUrl,
      url: url,
      model: PaymentModelEnum.ZIBAL,
    })) as {
      body: { trackId: number };
      status: HttpStatus;
      message: string;
    };

    if (paymentData.status !== HttpStatus.OK) {
      throw new CustomException(paymentData.message, paymentData.status);
    }

    const payment: Payment = this.paymentRepository.create({
      user: data.user,
      IPG: PaymentModelEnum.ZIBAL,
      amount: data.amount,
      authority: paymentData.body.trackId,
      status: PaymentStatusEnum.WAITING,
    });

    await this.paymentRepository.save(payment);

    return {
      status: 200,
      message: statusMessages.fa['200'],
      body: {
        route: `https://gateway.zibal.ir/start/${paymentData.body?.trackId}`,
      },
    };
  }
}
