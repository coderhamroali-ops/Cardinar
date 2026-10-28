import { Injectable, NotFoundException } from '@nestjs/common';
import { saveOrConflict } from '../../../../common/save-or-conflict';
import { CarMakeEntity } from '../../../entities/car-make.entity';
import { UpdateCarMakesRequest } from './update-car-makes.request';

@Injectable()
export class UpdateCarMakesHandler {
  async execute(id: number, payload: UpdateCarMakesRequest) {
    const item = await CarMakeEntity.findOneBy({ id });
    if (!item) throw new NotFoundException('CarMakes not found');
    Object.assign(item, payload);
    return saveOrConflict(item);
  }
}
