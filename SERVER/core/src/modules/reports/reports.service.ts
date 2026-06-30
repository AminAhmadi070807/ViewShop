import { Injectable } from '@nestjs/common';
import { ReportDto } from './dto/report.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Report } from './entities/report.entity';
import { Repository } from 'typeorm';
import { CustomException } from '../../common/exceptions/custom.exception.error';
import { statusMessages } from '../../common/message/message.status';

@Injectable()
export class ReportsService {
  constructor(
    @InjectRepository(Report)
    private readonly reportsRepository: Repository<Report>,
  ) {}

  create(data: ReportDto) {}

  async findAll() {
    try {
      const result: Report[] = await this.reportsRepository.find({
        order: {
          createdAt: 'DESC',
        },
      });

      return {
        status: 200,
        message: statusMessages.fa['200'],
        body: result,
      };
    } catch {
      throw new CustomException(statusMessages.fa['500'], 500);
    }
  }

  async findOne(id: string) {
    try {
      const result: Report | null = await this.reportsRepository.findOne({
        where: {
          id,
        },
      });

      if (!result) return new CustomException(statusMessages.fa['404'], 404);

      return {
        status: 200,
        body: result,
        message: statusMessages.fa['200'],
      };
    } catch {
      throw new CustomException(statusMessages.fa['500'], 500);
    }
  }

  answer(data: ReportDto) {}
}
