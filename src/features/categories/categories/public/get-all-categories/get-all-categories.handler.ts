import { Injectable } from '@nestjs/common';
import { CategoryEntity } from '../../../entities/category.entity';

@Injectable()
export class GetAllCategoriesPublicHandler {
  async execute() {
    return CategoryEntity.find({ order: { id: 'ASC' } });
  }
}
