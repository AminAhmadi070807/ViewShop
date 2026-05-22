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
  VerifyInterface,
} from '../../common/interfaces/verifye.interface';
import { PaymentModelEnum } from '../../common/interfaces/payment.interface';

@Injectable()
export class VerifiesService {
  constructor(
    @InjectRepository(Payment)
    private readonly paymentRepository: Repository<Payment>,
  ) {}

  private verifyRequestData(data: SendRequestInterface) {
    let requestBody;
    console.log(data);

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

  async verify(data: PaymentVerifyInterface) {
    try {
      // get payment data from database
      const payment: Payment | null = await this.paymentRepository.findOne({
        where: {
          authority: data.data.authority,
          user: data.userId,
          IPG: PaymentModelEnum.ZIBAL,
          status: PaymentStatusEnum.WAITING,
        },
      });

      // check payment
      if (!payment) {
        return {
          status: 402,
          message: statusMessages.fa['402'],
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

      if (result.status !== 200) {
        return {
          status: result.status,
          message: statusMessages.fa['402'],
          body: {},
        };
      }

      const body: VerifyInterface = (await result.json()) as VerifyInterface;
      console.log(body);

      return {
        status: body.data.code,
        body,
        message: statusMessages.fa['200'],
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

    const result = await this.verify({
      status: data.status,
      userId: data.userId,
      data: {
        merchant,
        authority: data.trackId,
        url: verifyUrl,
        amount: 0,
      },
    });

    return result;
  }
}
