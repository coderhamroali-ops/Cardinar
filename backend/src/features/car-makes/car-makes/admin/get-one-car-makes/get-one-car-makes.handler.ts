import { Injectable, NotFoundException } from '@nestjs/common';
import { CarMakeEntity } from '../../../entities/car-make.entity';

@Injectable()
export class GetOneCarMakesHandler {
  async execute(id: number) {
    const item = await CarMakeEntity.findOne({ where: { id } });
    if (!item) throw new NotFoundException('CarMakes not found');
    return item;
  }
}
