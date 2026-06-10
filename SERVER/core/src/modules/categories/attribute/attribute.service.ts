import { Injectable } from '@nestjs/common';
import { AttributeCategoryDto } from '../dto/attribute.category.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Attribute } from '../entities/attribute.entity';
import { Repository } from 'typeorm';

@Injectable()
export class AttributeService {
  constructor(
    @InjectRepository(Attribute)
    private readonly attributeRepository: Repository<Attribute>,
  ) {}

  create(data: AttributeCategoryDto) {}

  findAll() {}

  findOne(id: string) {}

  update(data: null) {}

  delete(id: string) {}
}
