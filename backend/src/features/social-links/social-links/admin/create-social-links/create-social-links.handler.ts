import { Injectable } from '@nestjs/common';
import { saveOrConflict } from '../../../../common/save-or-conflict';
import { SocialLinkEntity } from '../../../entities/social-link.entity';
import { CreateSocialLinksRequest } from './create-social-links.request';

@Injectable()
export class CreateSocialLinksHandler {
  async execute(payload: CreateSocialLinksRequest) {
    return saveOrConflict(SocialLinkEntity.create({ ...payload }));
  }
}
