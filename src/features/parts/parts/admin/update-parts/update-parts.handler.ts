import { Injectable, NotFoundException } from '@nestjs/common';
import { saveOrConflict } from '../../../../common/save-or-conflict';
import { PartEntity } from '../../../entities/part.entity';
import { UpdatePartsRequest } from './update-parts.request';

@Injectable()
export class UpdatePartsHandler {
  async execute(id: number, payload: UpdatePartsRequest) {
    const item = await PartEntity.findOneBy({ id });
    if (!item) throw new NotFoundException('Parts not found');
    Object.assign(item, payload);
    return saveOrConflict(item);
  }
}
