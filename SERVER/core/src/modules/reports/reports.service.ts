import { Injectable } from '@nestjs/common';
import { ReportDto } from './dto/report.dto';

@Injectable()
export class ReportsService {
  create(data: ReportDto) {
    return 'This action adds a new report';
  }

  findAll() {
    return `This action returns all reports`;
  }

  findOne(id: string) {
    return `This action returns a #${id} report`;
  }

  answer(data: ReportDto) {}
}
