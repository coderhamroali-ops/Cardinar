import { Injectable, NotFoundException } from '@nestjs/common';
import { CarMakeEntity } from '../../../entities/car-make.entity';

@Injectable()
export class DeleteCarMakesHandler {
  async execute(id: number) {
    const item = await CarMakeEntity.findOneBy({ id });
    if (!item) throw new NotFoundException('CarMakes not found');
    await item.remove();
    return { id };
  }
}
