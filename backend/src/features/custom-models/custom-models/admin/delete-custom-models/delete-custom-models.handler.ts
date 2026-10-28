import { Injectable, NotFoundException } from '@nestjs/common';
import { CustomModelEntity } from '../../../entities/custom-model.entity';

@Injectable()
export class DeleteCustomModelsHandler {
  async execute(id: number) {
    const item = await CustomModelEntity.findOneBy({ id });
    if (!item) throw new NotFoundException('CustomModels not found');
    await item.remove();
    return { id };
  }
}
