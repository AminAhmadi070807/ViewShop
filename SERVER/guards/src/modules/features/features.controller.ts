import { Controller } from '@nestjs/common';
import { MessagePattern, Payload } from '@nestjs/microservices';
import { FeaturesService } from './features.service';
import { CreateFeatureDto } from './dto/create-feature.dto';
import { UpdateFeatureDto } from './dto/update-feature.dto';
import { ValidateUUID } from '../../common/validations/id.dto';

@Controller()
export class FeaturesController {
  constructor(private readonly featuresService: FeaturesService) {}

  @MessagePattern('FEATURE:CREATE')
  create(@Payload() createFeatureDto: CreateFeatureDto) {
    return this.featuresService.create(createFeatureDto);
  }

  @MessagePattern('FEATURE:FIND')
  findAll() {
    return this.featuresService.findAll();
  }

  @MessagePattern('FEATURE:ONE')
  findOne(@Payload() data: ValidateUUID) {
    return this.featuresService.findOne(data.id);
  }

  @MessagePattern('FEATURE:UPDATE')
  update(@Payload() updateFeatureDto: UpdateFeatureDto) {
    return this.featuresService.update(updateFeatureDto.id, updateFeatureDto);
  }

  @MessagePattern('FEATURE:DELETE')
  remove(@Payload() data: ValidateUUID) {
    return this.featuresService.remove(data.id);
  }
}
