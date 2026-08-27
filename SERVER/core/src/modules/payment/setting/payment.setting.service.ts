import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { PaymentSetting } from '../entities/payment.setting.entity';
import { Repository } from 'typeorm';
import { PaymentSettingDto } from '../dto/payment.setting.dto';
import { statusMessages } from '../../../common/message/message.status';
import { CustomException } from '../../../common/exceptions/custom.exception.error';

@Injectable()
export class PaymentSettingService {
  constructor(
    @InjectRepository(PaymentSetting)
    private readonly paymentSettingRepository: Repository<PaymentSetting>,
  ) {}

  async create(data: PaymentSettingDto) {
    try {
      const existing = await this.paymentSettingRepository.findOneBy({
        title: data.title,
      });

      if (existing) return new CustomException(statusMessages.fa['409'], 409);

      const result = this.paymentSettingRepository.create(data);

      await this.paymentSettingRepository.save(result);

      return { status: 200, message: statusMessages.fa['200'], body: null };
    } catch {
      throw new CustomException(statusMessages.fa['500'], 500);
    }
  }

  async findAll() {
    try {
      const result = await this.paymentSettingRepository.find({
        order: { createdAt: 'DESC' },
      });

      return { status: 200, message: statusMessages.fa['200'], body: result };
    } catch {
      throw new CustomException(statusMessages.fa['500'], 500);
    }
  }

  async findOne(id: string) {
    try {
      const result = await this.paymentSettingRepository.findOneBy({ id: id });

      if (!result) return new CustomException(statusMessages.fa['404'], 404);

      return { status: 200, message: statusMessages.fa['200'], body: result };
    } catch {
      throw new CustomException(statusMessages.fa['500'], 500);
    }
  }

  async remove(id: string) {
    try {
      const result = await this.paymentSettingRepository.delete(id);

      if (!result.affected) {
        return new CustomException(statusMessages.fa['404'], 404);
      }

      return { status: 204, message: statusMessages.fa['204'], body: null };
    } catch {
      throw new CustomException(statusMessages.fa['500'], 500);
    }
  }
}
