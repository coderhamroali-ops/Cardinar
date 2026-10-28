import { Injectable, NotFoundException } from '@nestjs/common';
import { saveOrConflict } from '../../../../common/save-or-conflict';
import { CustomModelEntity } from '../../../entities/custom-model.entity';
import { UpdateCustomModelsRequest } from './update-custom-models.request';

@Injectable()
export class UpdateCustomModelsHandler {
  async execute(id: number, payload: UpdateCustomModelsRequest) {
    const item = await CustomModelEntity.findOneBy({ id });
    if (!item) throw new NotFoundException('CustomModels not found');
    Object.assign(item, payload);
    return saveOrConflict(item);
  }
}
