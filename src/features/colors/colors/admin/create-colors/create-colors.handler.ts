import { Injectable } from '@nestjs/common';
import { saveOrConflict } from '../../../../common/save-or-conflict';
import { ColorEntity } from '../../../entities/color.entity';
import { CreateColorsRequest } from './create-colors.request';

@Injectable()
export class CreateColorsHandler {
  async execute(payload: CreateColorsRequest) {
    return saveOrConflict(ColorEntity.create({ ...payload }));
  }
}
