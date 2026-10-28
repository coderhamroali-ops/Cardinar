import { Injectable } from '@nestjs/common';
import { BannerEntity } from '../../../../banners/entities/banner.entity';
import { PhoneNumberEntity } from '../../../../phone-numbers/entities/phone-number.entity';
import { SocialLinkEntity } from '../../../../social-links/entities/social-link.entity';
import { StaticInfoEntity } from '../../../../static-info/entities/static-info.entity';

// Header, footer va "Контакты" sahifasi uchun barcha umumiy ma'lumot bitta so'rovda
@Injectable()
export class GetSiteHandler {
  async execute() {
    const [info, banners, phoneNumbers, socialLinks] = await Promise.all([
      StaticInfoEntity.findOne({ where: {}, order: { id: 'ASC' } }),
      BannerEntity.find({ where: { isActive: true }, order: { id: 'ASC' } }),
      PhoneNumberEntity.find({ order: { id: 'ASC' } }),
      SocialLinkEntity.find({ order: { id: 'ASC' } }),
    ]);
    return { info, banners, phoneNumbers, socialLinks };
  }
}
