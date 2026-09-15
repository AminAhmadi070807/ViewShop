import { Controller } from '@nestjs/common';
import { MessagePattern, Payload } from '@nestjs/microservices';
import { StatisticsService } from './statistics.service';
import { CreateStatisticDto } from './dto/create-statistic.dto';
import { UpdateStatisticDto } from './dto/update-statistic.dto';

@Controller()
export class StatisticsController {
  constructor(private readonly statisticsService: StatisticsService) {}

  @MessagePattern('createStatistic')
  create(@Payload() createStatisticDto: CreateStatisticDto) {
    return this.statisticsService.create(createStatisticDto);
  }

  @MessagePattern('findAllStatistics')
  findAll() {
    return this.statisticsService.findAll();
  }

  @MessagePattern('findOneStatistic')
  findOne(@Payload() id: number) {
    return this.statisticsService.findOne(id);
  }

  @MessagePattern('updateStatistic')
  update(@Payload() updateStatisticDto: UpdateStatisticDto) {
    return this.statisticsService.update(updateStatisticDto.id, updateStatisticDto);
  }

  @MessagePattern('removeStatistic')
  remove(@Payload() id: number) {
    return this.statisticsService.remove(id);
  }
}
