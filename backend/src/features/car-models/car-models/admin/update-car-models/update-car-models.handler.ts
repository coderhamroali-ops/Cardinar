import { Injectable, NotFoundException } from '@nestjs/common';
import { saveOrConflict } from '../../../../common/save-or-conflict';
import { CarModelEntity } from '../../../entities/car-model.entity';
import { UpdateCarModelsRequest } from './update-car-models.request';

@Injectable()
export class UpdateCarModelsHandler {
  async execute(id: number, payload: UpdateCarModelsRequest) {
    const item = await CarModelEntity.findOneBy({ id });
    if (!item) throw new NotFoundException('CarModels not found');
    Object.assign(item, payload);
    return saveOrConflict(item);
  }
}
