import { Injectable, NotFoundException } from '@nestjs/common';
import { saveOrConflict } from '../../../../common/save-or-conflict';
import { CategoryEntity } from '../../../entities/category.entity';
import { UpdateCategoriesRequest } from './update-categories.request';

@Injectable()
export class UpdateCategoriesHandler {
  async execute(id: number, payload: UpdateCategoriesRequest) {
    const item = await CategoryEntity.findOneBy({ id });
    if (!item) throw new NotFoundException('Categories not found');
    Object.assign(item, payload);
    return saveOrConflict(item);
  }
}
