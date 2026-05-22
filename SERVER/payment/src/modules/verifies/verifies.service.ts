import { Injectable } from '@nestjs/common';
import { ZarinPalVerifyDto, ZibalVerifyDto } from './dto/verify.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Payment } from '../payment/entities/payment.entity';
import { Repository } from 'typeorm';
import { CustomException } from '../../common/exceptions/custom.exception.error';
import { statusMessages } from '../../common/messages/status.message';
import { ZarinPalVerifyEnum } from '../../common/enums/verifye/status.enum';
import { PaymentStatusEnum } from '../../common/enums/payment/status.enum';
import {
  PaymentVerifyInterface,
  SendRequestInterface,
} from '../../common/interfaces/verifye.interface';
import { PaymentModelEnum } from '../../common/interfaces/payment.interface';
import { Validation } from '../validations/entities/validation.entity';

@Injectable()
export class VerifiesService {
  constructor(
    @InjectRepository(Payment)
    private readonly paymentRepository: Repository<Payment>,
    @InjectRepository(Validation)
    private readonly validationRepository: Repository<Validation>,
  ) {}

  private verifyRequestData(data: SendRequestInterface) {
    let requestBody;

    if (data.model === PaymentModelEnum.ZARIN_PAL) {
      requestBody = {
        amount: data.amount,
        merchant_id: data.merchant,
        authority: data.authority,
      };
    } else if (data.model === PaymentModelEnum.ZIBAL) {
      requestBody = {
        merchant: data.merchant,
        trackId: data.authority,
      };
    } else {
      requestBody = {};
    }

    return requestBody;
  }

  private validateBody(data: { model: PaymentModelEnum; data: object }) {
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
    }
  }

  async verify(data: PaymentVerifyInterface) {
    try {
      // get payment data from database
      const payment: Payment | null = await this.paymentRepository.findOne({
        where: {
          authority: data.data.authority,
          user: data.userId,
        },
      });

      // check payment
      if (!payment) {
        return {
          status: 402,
          message: statusMessages.fa['402'],
          body: {},
        };
      } else if (payment.status === PaymentStatusEnum.SUCCESS) {
        return {
          status: 200,
          message: 'پرداخت قبلا تاید شده است',
          body: {},
        };
      }
      // create payload
      const payload: object = this.verifyRequestData({
        authority: data.data.authority,
        url: data.data.url,
        model: payment.IPG,
        amount: payment.amount,
        merchant: data.data.merchant,
      });

      // send request to payment service
      const result: Response = await fetch(data.data.url, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(payload),
      });

      // check status result
      if (result.status !== 200) {
        return {
          status: result.status,
          message: statusMessages.fa['402'],
          body: {},
        };
      }

      // take out body from result
      const body: object = (await result.json()) as object;

      // get status & model from body
      const resultBody: { model: PaymentModelEnum; status: number } =
        this.validateBody({ model: payment.IPG, data: body }) as {
          model: PaymentModelEnum;
          status: number;
        };

      // get status code from database
      const statusResult: Validation | null =
        await this.validationRepository.findOneBy({
          IPG: payment.IPG,
          statusCode: resultBody.status,
        });

      // check status code
      if (!statusResult) {
        return {
          status: 404,
          message: 'کد وضیعت پیدا نشد',
          body: {},
        };
      }

      // update payment to success
      payment.status = PaymentStatusEnum.SUCCESS;

      // save payment
      await this.paymentRepository.save(payment);

      return {
        status: 200,
        message: statusResult.description,
        body: {},
      };
    } catch {
      return {
        status: 402,
        message: statusMessages.fa['402'],
        body: {},
      };
    }
  }

  async zarinPal(data: ZarinPalVerifyDto) {
    const payment: Payment | null = await this.paymentRepository.findOne({
      where: {
        authority: data.authority,
        user: data.userId,
        IPG: PaymentModelEnum.ZARIN_PAL,
        status: PaymentStatusEnum.WAITING,
      },
    });

    if (!payment) throw new CustomException(statusMessages.fa['402'], 402);
    else if (data.status === ZarinPalVerifyEnum.NOK) {
      payment.status = PaymentStatusEnum.FAILED;
      await this.paymentRepository.save(payment);

      throw new CustomException(statusMessages.fa['402'], 402);
    }

    const merchant = process.env.ZARIN_PAL_MERCHANT as string;
    const verifyUrl = process.env.ZARIN_PAL_VALIDATE as string;

    const verify = await this.verify({
      status: data.status === ZarinPalVerifyEnum.OK ? 1 : 2,
      userId: data.userId,
      data: {
        merchant,
        url: verifyUrl,
        amount: payment.amount,
        authority: payment.authority,
      },
    });

    if (verify.status === 101 || verify.status === 100) {
      payment.status = PaymentStatusEnum.SUCCESS;
      await this.paymentRepository.save(payment);

      return {
        status: 204,
        message: statusMessages.fa['200'],
        body: null,
      };
    }

    return {
      status: verify.status,
      message: verify.message,
      body: verify.body,
    };
  }

  async zibal(data: ZibalVerifyDto) {
    const merchant = process.env.ZIBAL_PAL_MERCHANT as string;
    const verifyUrl = process.env.ZIBAL_PAL_VALIDATE as string;

    return await this.verify({
      status: data.status,
      userId: data.userId,
      data: {
        merchant,
        authority: data.trackId,
        url: verifyUrl,
        amount: 0,
      },
    });
  }
}
