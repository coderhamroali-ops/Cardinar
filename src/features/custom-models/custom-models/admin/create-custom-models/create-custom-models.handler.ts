import { Injectable } from '@nestjs/common';
import { saveOrConflict } from '../../../../common/save-or-conflict';
import { CustomModelEntity } from '../../../entities/custom-model.entity';
import { CreateCustomModelsRequest } from './create-custom-models.request';

@Injectable()
export class CreateCustomModelsHandler {
  async execute(payload: CreateCustomModelsRequest) {
    return saveOrConflict(CustomModelEntity.create({ ...payload }));
  }
}
