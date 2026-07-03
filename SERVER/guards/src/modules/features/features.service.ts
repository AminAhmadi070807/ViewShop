import { Injectable } from '@nestjs/common';
import { CreateFeatureDto } from './dto/create-feature.dto';
import { UpdateFeatureDto } from './dto/update-feature.dto';

@Injectable()
export class FeaturesService {
  create(data: CreateFeatureDto) {}

  findAll() {}

  findOne(id: string) {}

  update(data: CreateFeatureDto) {}

  remove(id: string) {}
}
