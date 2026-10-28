import { ApiProperty } from '@nestjs/swagger';
import { Column, Entity } from 'typeorm';
import { BaseModel } from '../../../core/base-model';
import { CustomCategory } from '../../../core/enum/enum';

// Konstruktordagi asosiy model (Классика, Ромб, Полоса ...) — bazaviy rasm bilan
@Entity('customModels')
export class CustomModelEntity extends BaseModel {
  @ApiProperty({ enum: CustomCategory }) @Column({ type: 'enum', enum: CustomCategory }) category: CustomCategory;
  @ApiProperty() @Column({ length: 128, unique: true }) title: string;
  @ApiProperty() @Column({ length: 256 }) image: string;
}
