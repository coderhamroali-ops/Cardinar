import { ApiProperty } from '@nestjs/swagger';
import { Column, Entity } from 'typeorm';
import { BaseModel } from '../../../core/base-model';

// Yagona yozuv (singleton): kompaniya manzili, telefoni, ish vaqti, email
@Entity('staticInfo')
export class StaticInfoEntity extends BaseModel {
  @ApiProperty() @Column({ length: 128 }) address: string;
  @ApiProperty() @Column({ length: 16 }) phoneNumber: string;
  @ApiProperty() @Column({ length: 128 }) workingHours: string;
  @ApiProperty() @Column({ length: 64 }) email: string;
}
