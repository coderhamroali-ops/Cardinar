import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { SocialLinkEntity } from './entities/social-link.entity';
import { SocialLinksAdminController } from './social-links/admin/social-links-admin.controller';
import { CreateSocialLinksHandler } from './social-links/admin/create-social-links/create-social-links.handler';
import { GetAllSocialLinksHandler } from './social-links/admin/get-all-social-links/get-all-social-links.handler';
import { GetOneSocialLinksHandler } from './social-links/admin/get-one-social-links/get-one-social-links.handler';
import { UpdateSocialLinksHandler } from './social-links/admin/update-social-links/update-social-links.handler';
import { DeleteSocialLinksHandler } from './social-links/admin/delete-social-links/delete-social-links.handler';

@Module({
  imports: [TypeOrmModule.forFeature([SocialLinkEntity])],
  controllers: [
    SocialLinksAdminController,
  ],
  providers: [
    CreateSocialLinksHandler,
    GetAllSocialLinksHandler,
    GetOneSocialLinksHandler,
    UpdateSocialLinksHandler,
    DeleteSocialLinksHandler,
  ],
})
export class SocialLinksModule {}
