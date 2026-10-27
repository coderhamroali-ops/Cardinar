import { ApiProperty } from '@nestjs/swagger';
import { Column, Entity } from 'typeorm';
import { BaseModel } from '../../core/base-model';

// Yagona yozuv (singleton): kompaniya manzili, telefoni, ish vaqti, email
@Entity('staticInfo')
export class StaticInfoEntity extends BaseModel {
  @ApiProperty() @Column({ length: 128 }) address: string;
  @ApiProperty() @Column({ length: 16 }) phoneNumber: string;
  @ApiProperty() @Column({ length: 128 }) workingHours: string;
  @ApiProperty() @Column({ length: 64 }) email: string;
}

@Entity('banners')
export class BannerEntity extends BaseModel {
  @ApiProperty() @Column({ length: 128 }) title: string;
  @ApiProperty() @Column({ length: 256 }) image: string;
  @ApiProperty() @Column() isActive: boolean;
}

@Entity('phoneNumbers')
export class PhoneNumberEntity extends BaseModel {
  @ApiProperty() @Column({ length: 16, unique: true }) value: string;
}

@Entity('socialLinks')
export class SocialLinkEntity extends BaseModel {
  @ApiProperty() @Column({ length: 64 }) title: string;
  @ApiProperty() @Column({ length: 256, unique: true }) link: string;
  @ApiProperty() @Column({ length: 128 }) icon: string;
}
