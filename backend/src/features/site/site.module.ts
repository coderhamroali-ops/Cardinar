import { Module } from '@nestjs/common';
import { SitePublicController } from './site/public/site-public.controller';
import { GetSiteHandler } from './site/public/get-site/get-site.handler';

// O'z jadvali yo'q: static-info, banners, phone-numbers va social-links'dan yig'adi
@Module({
  controllers: [SitePublicController],
  providers: [GetSiteHandler],
})
export class SiteModule {}
