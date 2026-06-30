import { Injectable } from '@nestjs/common';
import { ReportDto } from './dto/report.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Report } from './entities/report.entity';
import { Repository } from 'typeorm';

@Injectable()
export class ReportsService {
  constructor(
    @InjectRepository(Report)
    private readonly reportsRepository: Repository<Report>,
  ) {}

  create(data: ReportDto) {}

  findAll() {}

  findOne(id: string) {}

  answer(data: ReportDto) {}
}
