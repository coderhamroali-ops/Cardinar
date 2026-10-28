import { Injectable } from '@nestjs/common';
import { ColorEntity } from '../../../entities/color.entity';

@Injectable()
export class GetAllColorsPublicHandler {
  async execute() {
    return ColorEntity.find({ order: { id: 'ASC' } });
  }
}
