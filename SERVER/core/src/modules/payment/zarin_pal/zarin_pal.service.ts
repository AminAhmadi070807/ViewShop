import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Payment } from '../entities/payment.entity';
import { ConfigService } from '@nestjs/config';
import { Repository } from 'typeorm';
import { Validation } from '../../validations/entities/validation.entity';
import { ZarinPalDto } from '../dto/payment.dto';

@Injectable()
export class ZarinPalService {
  constructor(
    private readonly config: ConfigService,
    @InjectRepository(Payment)
    private readonly paymentRepository: Repository<Payment>,
    @InjectRepository(Validation)
    private readonly validationRepository: Repository<Validation>,
  ) {}

  payment(data: ZarinPalDto) {
    return data;
  }
}
