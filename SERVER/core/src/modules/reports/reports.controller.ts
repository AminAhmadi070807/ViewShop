import { Controller } from '@nestjs/common';
import { MessagePattern, Payload } from '@nestjs/microservices';
import { ReportsService } from './reports.service';
import { ReportDto } from './dto/report.dto';

@Controller()
export class ReportsController {
  constructor(private readonly reportsService: ReportsService) {}

  @MessagePattern('REPORT:CREATE')
  create(@Payload() data: ReportDto) {
    return this.reportsService.create(data);
  }

  @MessagePattern('REPORT:FIND')
  findAll() {
    return this.reportsService.findAll();
  }

  @MessagePattern('REPORT:ONE')
  findOne(@Payload() id: string) {
    return this.reportsService.findOne(id);
  }

  @MessagePattern('REPORT:ANSWER')
  answer(@Payload() data: ReportDto) {
    return this.reportsService.answer(data);
  }
}
