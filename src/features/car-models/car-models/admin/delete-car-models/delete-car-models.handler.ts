import { Injectable, NotFoundException } from '@nestjs/common';
import { CarModelEntity } from '../../../entities/car-model.entity';

@Injectable()
export class DeleteCarModelsHandler {
  async execute(id: number) {
    const item = await CarModelEntity.findOneBy({ id });
    if (!item) throw new NotFoundException('CarModels not found');
    await item.remove();
    return { id };
  }
}
