import { Injectable } from '@nestjs/common';
import { saveOrConflict } from '../../../../common/save-or-conflict';
import { CarMakeEntity } from '../../../entities/car-make.entity';
import { CreateCarMakesRequest } from './create-car-makes.request';

@Injectable()
export class CreateCarMakesHandler {
  async execute(payload: CreateCarMakesRequest) {
    return saveOrConflict(CarMakeEntity.create({ ...payload }));
  }
}
