import { ApiProperty } from '@nestjs/swagger';
import { Column, Entity } from 'typeorm';
import { BaseModel } from '../../../core/base-model';

@Entity('phoneNumbers')
export class PhoneNumberEntity extends BaseModel {
  @ApiProperty() @Column({ length: 16, unique: true }) value: string;
}
