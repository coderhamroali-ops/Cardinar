import { Injectable } from '@nestjs/common';
import { saveOrConflict } from '../../../../common/save-or-conflict';
import { PartEntity } from '../../../entities/part.entity';
import { CreatePartsRequest } from './create-parts.request';

@Injectable()
export class CreatePartsHandler {
  async execute(payload: CreatePartsRequest) {
    return saveOrConflict(PartEntity.create({ ...payload }));
  }
}
