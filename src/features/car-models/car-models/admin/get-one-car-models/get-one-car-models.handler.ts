import { Injectable, NotFoundException } from '@nestjs/common';
import { CarModelEntity } from '../../../entities/car-model.entity';

@Injectable()
export class GetOneCarModelsHandler {
  async execute(id: number) {
    const item = await CarModelEntity.findOne({ where: { id }, relations: { carMake: true } });
    if (!item) throw new NotFoundException('CarModels not found');
    return item;
  }
}
