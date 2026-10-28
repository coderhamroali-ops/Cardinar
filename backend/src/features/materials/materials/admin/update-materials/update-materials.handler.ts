import { Injectable, NotFoundException } from '@nestjs/common';
import { saveOrConflict } from '../../../../common/save-or-conflict';
import { MaterialEntity } from '../../../entities/material.entity';
import { UpdateMaterialsRequest } from './update-materials.request';

@Injectable()
export class UpdateMaterialsHandler {
  async execute(id: number, payload: UpdateMaterialsRequest) {
    const item = await MaterialEntity.findOneBy({ id });
    if (!item) throw new NotFoundException('Materials not found');
    Object.assign(item, payload);
    return saveOrConflict(item);
  }
}
