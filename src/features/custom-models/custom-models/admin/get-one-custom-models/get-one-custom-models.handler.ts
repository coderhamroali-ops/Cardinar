import { Injectable, NotFoundException } from '@nestjs/common';
import { CustomModelEntity } from '../../../entities/custom-model.entity';

@Injectable()
export class GetOneCustomModelsHandler {
  async execute(id: number) {
    const item = await CustomModelEntity.findOne({ where: { id } });
    if (!item) throw new NotFoundException('CustomModels not found');
    return item;
  }
}
