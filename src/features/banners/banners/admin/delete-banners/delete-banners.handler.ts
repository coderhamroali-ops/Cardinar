import { Injectable, NotFoundException } from '@nestjs/common';
import { BannerEntity } from '../../../entities/banner.entity';

@Injectable()
export class DeleteBannersHandler {
  async execute(id: number) {
    const item = await BannerEntity.findOneBy({ id });
    if (!item) throw new NotFoundException('Banners not found');
    await item.remove();
    return { id };
  }
}
