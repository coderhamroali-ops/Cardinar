import { Injectable, NotFoundException } from '@nestjs/common';
import { CategoryEntity } from '../../../entities/category.entity';

@Injectable()
export class DeleteCategoriesHandler {
  async execute(id: number) {
    const item = await CategoryEntity.findOneBy({ id });
    if (!item) throw new NotFoundException('Categories not found');
    await item.remove();
    return { id };
  }
}
