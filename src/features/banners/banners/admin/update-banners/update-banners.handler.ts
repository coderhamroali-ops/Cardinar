import { Injectable, NotFoundException } from '@nestjs/common';
import { saveOrConflict } from '../../../../common/save-or-conflict';
import { BannerEntity } from '../../../entities/banner.entity';
import { UpdateBannersRequest } from './update-banners.request';

@Injectable()
export class UpdateBannersHandler {
  async execute(id: number, payload: UpdateBannersRequest) {
    const item = await BannerEntity.findOneBy({ id });
    if (!item) throw new NotFoundException('Banners not found');
    Object.assign(item, payload);
    return saveOrConflict(item);
  }
}
