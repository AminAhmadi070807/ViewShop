import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Payment } from '../../entities/payment.entity';
import { Repository } from 'typeorm';
import { ZarinPalDto } from '../../dto/payment.dto';

@Injectable()
export class ZarinPalService {
  constructor(
    @InjectRepository(Payment)
    private readonly paymentRepository: Repository<Payment>,
  ) {}

  payment(data: ZarinPalDto) {
    return data;
  }
}
