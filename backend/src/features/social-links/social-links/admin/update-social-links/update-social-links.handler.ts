import { Injectable, NotFoundException } from '@nestjs/common';
import { saveOrConflict } from '../../../../common/save-or-conflict';
import { SocialLinkEntity } from '../../../entities/social-link.entity';
import { UpdateSocialLinksRequest } from './update-social-links.request';

@Injectable()
export class UpdateSocialLinksHandler {
  async execute(id: number, payload: UpdateSocialLinksRequest) {
    const item = await SocialLinkEntity.findOneBy({ id });
    if (!item) throw new NotFoundException('SocialLinks not found');
    Object.assign(item, payload);
    return saveOrConflict(item);
  }
}
