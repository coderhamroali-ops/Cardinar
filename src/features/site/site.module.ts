import { Body, Controller, Get, Module, Put, ValidationPipe } from '@nestjs/common';
import { ApiBearerAuth, ApiProperty, ApiTags, PartialType } from '@nestjs/swagger';
import { IsBoolean, IsEmail, IsString, IsUrl, MaxLength } from 'class-validator';
import { AdminCrudController } from '../../core/crud.controller';
import { BannerEntity, PhoneNumberEntity, SocialLinkEntity, StaticInfoEntity } from './site.entity';

class StaticInfoDto {
  @ApiProperty() @IsString() @MaxLength(128) address: string;
  @ApiProperty() @IsString() @MaxLength(16) phoneNumber: string;
  @ApiProperty() @IsString() @MaxLength(128) workingHours: string;
  @ApiProperty() @IsEmail() @MaxLength(64) email: string;
}

class CreateBannerDto {
  @ApiProperty() @IsString() @MaxLength(128) title: string;
  @ApiProperty() @IsString() @MaxLength(256) image: string;
  @ApiProperty() @IsBoolean() isActive: boolean;
}
class UpdateBannerDto extends PartialType(CreateBannerDto) {}

class CreatePhoneNumberDto {
  @ApiProperty() @IsString() @MaxLength(16) value: string;
}
class UpdatePhoneNumberDto extends PartialType(CreatePhoneNumberDto) {}

class CreateSocialLinkDto {
  @ApiProperty() @IsString() @MaxLength(64) title: string;
  @ApiProperty() @IsUrl() @MaxLength(256) link: string;
  @ApiProperty() @IsString() @MaxLength(128) icon: string;
}
class UpdateSocialLinkDto extends PartialType(CreateSocialLinkDto) {}

// Header, footer va "Контакты" sahifasi uchun barcha umumiy ma'lumot bitta so'rovda
@ApiTags('public / site')
@Controller('public/site')
class SitePublicController {
  @Get()
  async get() {
    const [info, banners, phoneNumbers, socialLinks] = await Promise.all([
      StaticInfoEntity.findOne({ where: {}, order: { id: 'ASC' } }),
      BannerEntity.find({ where: { isActive: true }, order: { id: 'ASC' } }),
      PhoneNumberEntity.find({ order: { id: 'ASC' } }),
      SocialLinkEntity.find({ order: { id: 'ASC' } }),
    ]);
    return { info, banners, phoneNumbers, socialLinks };
  }
}

// staticInfo — singleton: bitta yozuv, PUT bilan yaratiladi yoki yangilanadi
@ApiTags('admin / static-info')
@ApiBearerAuth()
@Controller('admin/static-info')
class StaticInfoAdminController {
  @Get()
  get() {
    return StaticInfoEntity.findOne({ where: {}, order: { id: 'ASC' } });
  }

  @Put()
  async upsert(@Body(new ValidationPipe({ whitelist: true })) payload: StaticInfoDto) {
    const info = (await StaticInfoEntity.findOne({ where: {}, order: { id: 'ASC' } })) ?? StaticInfoEntity.create();
    Object.assign(info, payload);
    return info.save();
  }
}

@Module({
  controllers: [
    SitePublicController,
    StaticInfoAdminController,
    AdminCrudController('banners', BannerEntity, CreateBannerDto, UpdateBannerDto),
    AdminCrudController('phone-numbers', PhoneNumberEntity, CreatePhoneNumberDto, UpdatePhoneNumberDto),
    AdminCrudController('social-links', SocialLinkEntity, CreateSocialLinkDto, UpdateSocialLinkDto),
  ],
})
export class SiteModule {}
