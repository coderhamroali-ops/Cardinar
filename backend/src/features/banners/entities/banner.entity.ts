import { ApiProperty } from '@nestjs/swagger';
import { Column, Entity } from 'typeorm';
import { BaseModel } from '../../../core/base-model';

@Entity('banners')
export class BannerEntity extends BaseModel {
  @ApiProperty() @Column({ length: 128 }) title: string;
  @ApiProperty() @Column({ length: 256 }) image: string;
  @ApiProperty() @Column() isActive: boolean;
}
