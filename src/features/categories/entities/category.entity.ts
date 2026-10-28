import { ApiProperty } from '@nestjs/swagger';
import { Column, Entity } from 'typeorm';
import { BaseModel } from '../../../core/base-model';

@Entity('categories')
export class CategoryEntity extends BaseModel {
  @ApiProperty() @Column({ length: 128, unique: true }) title: string;
}
