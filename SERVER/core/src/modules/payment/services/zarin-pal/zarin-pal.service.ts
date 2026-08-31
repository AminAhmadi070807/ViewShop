import { Injectable } from '@nestjs/common';
import { ZarinPalDto, ZarinPalVerifyDto } from './zarin-pal.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Payment } from '../../entities/payment.entity';
import { Repository } from 'typeorm';

@Injectable()
export class ZarinPalService {
  constructor(
    @InjectRepository(Payment)
    private readonly paymentRepository: Repository<Payment>,
  ) {}

  verify(data: ZarinPalVerifyDto) {}

  payment(data: ZarinPalDto) {}
}
