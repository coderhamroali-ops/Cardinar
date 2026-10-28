import { Injectable, NotFoundException } from '@nestjs/common';
import { saveOrConflict } from '../../../../common/save-or-conflict';
import { ColorEntity } from '../../../entities/color.entity';
import { UpdateColorsRequest } from './update-colors.request';

@Injectable()
export class UpdateColorsHandler {
  async execute(id: number, payload: UpdateColorsRequest) {
    const item = await ColorEntity.findOneBy({ id });
    if (!item) throw new NotFoundException('Colors not found');
    Object.assign(item, payload);
    return saveOrConflict(item);
  }
}
