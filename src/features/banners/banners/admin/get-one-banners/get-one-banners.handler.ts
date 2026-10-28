import { Injectable, NotFoundException } from '@nestjs/common';
import { BannerEntity } from '../../../entities/banner.entity';

@Injectable()
export class GetOneBannersHandler {
  async execute(id: number) {
    const item = await BannerEntity.findOne({ where: { id } });
    if (!item) throw new NotFoundException('Banners not found');
    return item;
  }
}
