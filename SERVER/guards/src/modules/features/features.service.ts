import { Injectable } from '@nestjs/common';
import { FeatureDto } from './dto/feature.dto';

@Injectable()
export class FeaturesService {
  create(data: FeatureDto) {}

  findAll() {}

  findOne(id: string) {}

  update(data: FeatureDto) {}

  remove(id: string) {}
}
