import { Injectable, NotFoundException } from '@nestjs/common';
import { SocialLinkEntity } from '../../../entities/social-link.entity';

@Injectable()
export class GetOneSocialLinksHandler {
  async execute(id: number) {
    const item = await SocialLinkEntity.findOne({ where: { id } });
    if (!item) throw new NotFoundException('SocialLinks not found');
    return item;
  }
}
