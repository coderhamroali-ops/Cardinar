import { Injectable } from '@nestjs/common';
import { CustomModelEntity } from '../../../../custom-models/entities/custom-model.entity';
import { MaterialEntity } from '../../../../materials/entities/material.entity';
import { PartEntity } from '../../../../parts/entities/part.entity';
import { GetConstructorOptionsRequest } from './get-constructor-options.request';

// Konstruktor sahifasi uchun hamma narsa bitta so'rovda: modellar, qatlamlar, materiallar
@Injectable()
export class GetConstructorOptionsHandler {
  async execute(query: GetConstructorOptionsRequest) {
    const [models, parts, materials] = await Promise.all([
      CustomModelEntity.find({ where: { category: query.category }, order: { id: 'ASC' } }),
      PartEntity.find({ where: { category: query.category }, relations: { color: true }, order: { id: 'ASC' } }),
      MaterialEntity.find({ order: { id: 'ASC' } }),
    ]);
    return { models, parts, materials };
  }
}
