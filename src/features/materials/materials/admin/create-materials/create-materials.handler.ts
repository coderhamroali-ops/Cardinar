import { Injectable } from '@nestjs/common';
import { saveOrConflict } from '../../../../common/save-or-conflict';
import { MaterialEntity } from '../../../entities/material.entity';
import { CreateMaterialsRequest } from './create-materials.request';

@Injectable()
export class CreateMaterialsHandler {
  async execute(payload: CreateMaterialsRequest) {
    return saveOrConflict(MaterialEntity.create({ ...payload }));
  }
}
