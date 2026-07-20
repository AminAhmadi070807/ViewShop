import { Controller } from '@nestjs/common';
import { MessagePattern, Payload } from '@nestjs/microservices';
import { ReportsService } from './reports.service';
import { AnswerReportDto, ReportDto } from './dto/report.dto';
import { ValidateUUID } from '../../common/validations/validate.dto';

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
  findOne(@Payload() data: ValidateUUID) {
    return this.reportsService.findOne(data.id);
  }

  @MessagePattern('REPORT:ANSWER')
  answer(@Payload() data: AnswerReportDto) {
    return this.reportsService.answer(data);
  }
}
