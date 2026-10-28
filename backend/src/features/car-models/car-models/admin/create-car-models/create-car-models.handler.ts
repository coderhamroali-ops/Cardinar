import { Injectable } from '@nestjs/common';
import { saveOrConflict } from '../../../../common/save-or-conflict';
import { CarModelEntity } from '../../../entities/car-model.entity';
import { CreateCarModelsRequest } from './create-car-models.request';

@Injectable()
export class CreateCarModelsHandler {
  async execute(payload: CreateCarModelsRequest) {
    return saveOrConflict(CarModelEntity.create({ ...payload }));
  }
}
