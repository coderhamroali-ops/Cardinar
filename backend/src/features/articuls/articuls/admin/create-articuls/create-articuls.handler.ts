import { Injectable } from '@nestjs/common';
import { saveOrConflict } from '../../../../common/save-or-conflict';
import { ArticulEntity } from '../../../entities/articul.entity';
import { CreateArticulsRequest } from './create-articuls.request';

@Injectable()
export class CreateArticulsHandler {
  async execute(payload: CreateArticulsRequest) {
    return saveOrConflict(ArticulEntity.create({ ...payload }));
  }
}
