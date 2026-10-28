import { Injectable } from '@nestjs/common';
import { saveOrConflict } from '../../../../common/save-or-conflict';
import { BannerEntity } from '../../../entities/banner.entity';
import { CreateBannersRequest } from './create-banners.request';

@Injectable()
export class CreateBannersHandler {
  async execute(payload: CreateBannersRequest) {
    return saveOrConflict(BannerEntity.create({ ...payload }));
  }
}
