import { Injectable } from '@nestjs/common';
import { saveOrConflict } from '../../../../common/save-or-conflict';
import { CategoryEntity } from '../../../entities/category.entity';
import { CreateCategoriesRequest } from './create-categories.request';

@Injectable()
export class CreateCategoriesHandler {
  async execute(payload: CreateCategoriesRequest) {
    return saveOrConflict(CategoryEntity.create({ ...payload }));
  }
}
