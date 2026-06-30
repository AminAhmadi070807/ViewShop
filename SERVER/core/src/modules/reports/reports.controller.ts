import { Controller } from '@nestjs/common';
import { MessagePattern, Payload } from '@nestjs/microservices';
import { ReportsService } from './reports.service';
import { CreateReportDto } from './dto/create-report.dto';
import { UpdateReportDto } from './dto/update-report.dto';

@Controller()
export class ReportsController {
  constructor(private readonly reportsService: ReportsService) {}

  @MessagePattern('createReport')
  create(@Payload() createReportDto: CreateReportDto) {
    return this.reportsService.create(createReportDto);
  }

  @MessagePattern('findAllReports')
  findAll() {
    return this.reportsService.findAll();
  }

  @MessagePattern('findOneReport')
  findOne(@Payload() id: number) {
    return this.reportsService.findOne(id);
  }

  @MessagePattern('updateReport')
  update(@Payload() updateReportDto: UpdateReportDto) {
    return this.reportsService.update(updateReportDto.id, updateReportDto);
  }

  @MessagePattern('removeReport')
  remove(@Payload() id: number) {
    return this.reportsService.remove(id);
  }
}
