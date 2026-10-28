import { ApiProperty } from '@nestjs/swagger';
import { Column, Entity } from 'typeorm';
import { BaseModel } from '../../../core/base-model';

@Entity('materials')
export class MaterialEntity extends BaseModel {
  @ApiProperty() @Column({ length: 64, unique: true }) title: string;
  @ApiProperty() @Column({ length: 512, nullable: true }) description?: string;
}
