import { Controller } from '@nestjs/common';
import { MessagePattern, Payload } from '@nestjs/microservices';
import { ReportsService } from './reports.service';
import { AnswerReportDto, ReportDto } from './dto/report.dto';
import { Validate } from '../../common/validations/validate.dto';
import { PageFilter } from '../../common/filters/page.filter';

@Controller()
export class ReportsController {
  constructor(private readonly reportsService: ReportsService) {}

  @MessagePattern('REPORT:CREATE')
  create(@Payload() data: ReportDto) {
    return this.reportsService.create(data);
  }

  @MessagePattern('REPORT:FIND')
  findAll(@Payload() data: PageFilter) {
    return this.reportsService.findAll(data.page);
  }

  @MessagePattern('REPORT:ONE')
  findOne(@Payload() data: Validate) {
    return this.reportsService.findOne(data);
  }

  @MessagePattern('REPORT:ANSWER')
  answer(@Payload() data: AnswerReportDto) {
    return this.reportsService.answer(data);
  }

  @MessagePattern('REPORT:DELETE')
  remove(@Payload() data: Validate) {
    return this.reportsService.remove(data.id);
  }
}
