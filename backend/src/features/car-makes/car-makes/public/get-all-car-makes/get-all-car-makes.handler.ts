import { Injectable } from '@nestjs/common';
import { CarMakeEntity } from '../../../entities/car-make.entity';

// Marka va uning modellari birga: katalog filtri va konstruktordagi tanlovlar uchun
@Injectable()
export class GetAllCarMakesPublicHandler {
  async execute() {
    return CarMakeEntity.find({ relations: { models: true }, order: { id: 'ASC', models: { id: 'ASC' } } });
  }
}
