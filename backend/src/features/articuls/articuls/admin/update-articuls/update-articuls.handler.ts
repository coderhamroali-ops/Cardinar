import { Injectable, NotFoundException } from '@nestjs/common';
import { saveOrConflict } from '../../../../common/save-or-conflict';
import { ArticulEntity } from '../../../entities/articul.entity';
import { UpdateArticulsRequest } from './update-articuls.request';

@Injectable()
export class UpdateArticulsHandler {
  async execute(id: number, payload: UpdateArticulsRequest) {
    const item = await ArticulEntity.findOneBy({ id });
    if (!item) throw new NotFoundException('Articuls not found');
    Object.assign(item, payload);
    return saveOrConflict(item);
  }
}
