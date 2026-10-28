import { Injectable, NotFoundException } from '@nestjs/common';
import { SocialLinkEntity } from '../../../entities/social-link.entity';

@Injectable()
export class DeleteSocialLinksHandler {
  async execute(id: number) {
    const item = await SocialLinkEntity.findOneBy({ id });
    if (!item) throw new NotFoundException('SocialLinks not found');
    await item.remove();
    return { id };
  }
}
