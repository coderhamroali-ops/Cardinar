import { ApiProperty } from '@nestjs/swagger';
import { Column, Entity } from 'typeorm';
import { BaseModel } from '../../../core/base-model';

@Entity('colors')
export class ColorEntity extends BaseModel {
  @ApiProperty() @Column({ length: 64, unique: true }) title: string;
  @ApiProperty({ description: 'HEX, masalan #FF0000' }) @Column({ length: 12, unique: true }) color: string;
}
