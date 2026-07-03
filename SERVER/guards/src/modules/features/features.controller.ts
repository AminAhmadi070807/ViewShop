import { Controller } from '@nestjs/common';
import { MessagePattern, Payload } from '@nestjs/microservices';
import { FeaturesService } from './features.service';
import { CreateFeatureDto } from './dto/create-feature.dto';
import { UpdateFeatureDto } from './dto/update-feature.dto';

@Controller()
export class FeaturesController {
  constructor(private readonly featuresService: FeaturesService) {}

  @MessagePattern('createFeature')
  create(@Payload() createFeatureDto: CreateFeatureDto) {
    return this.featuresService.create(createFeatureDto);
  }

  @MessagePattern('findAllFeatures')
  findAll() {
    return this.featuresService.findAll();
  }

  @MessagePattern('findOneFeature')
  findOne(@Payload() id: number) {
    return this.featuresService.findOne(id);
  }

  @MessagePattern('updateFeature')
  update(@Payload() updateFeatureDto: UpdateFeatureDto) {
    return this.featuresService.update(updateFeatureDto.id, updateFeatureDto);
  }

  @MessagePattern('removeFeature')
  remove(@Payload() id: number) {
    return this.featuresService.remove(id);
  }
}
