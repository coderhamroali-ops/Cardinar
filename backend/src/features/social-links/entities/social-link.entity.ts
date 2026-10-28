import { ApiProperty } from '@nestjs/swagger';
import { Column, Entity } from 'typeorm';
import { BaseModel } from '../../../core/base-model';

@Entity('socialLinks')
export class SocialLinkEntity extends BaseModel {
  @ApiProperty() @Column({ length: 64 }) title: string;
  @ApiProperty() @Column({ length: 256, unique: true }) link: string;
  @ApiProperty() @Column({ length: 128 }) icon: string;
}
