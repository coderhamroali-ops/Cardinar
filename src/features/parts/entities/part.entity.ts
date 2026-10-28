import { ApiProperty } from '@nestjs/swagger';
import { Column, Entity, JoinColumn, ManyToOne, type Relation } from 'typeorm';
import { BaseModel } from '../../../core/base-model';
import { CustomCategory, PartType } from '../../../core/enum/enum';
import { ColorEntity } from '../../colors/entities/color.entity';
import { MaterialEntity } from '../../materials/entities/material.entity';

// Bazaviy rasm ustiga qo'yiladigan qatlam: qism + material + rang
@Entity('parts')
export class PartEntity extends BaseModel {
  @ApiProperty({ enum: CustomCategory }) @Column({ type: 'enum', enum: CustomCategory }) category: CustomCategory;
  @ApiProperty({ enum: PartType }) @Column({ type: 'enum', enum: PartType }) part: PartType;
  @ApiProperty() @Column({ length: 128, nullable: true }) title?: string;

  @ApiProperty() @Column() materialId: number;
  @ManyToOne(() => MaterialEntity, { onDelete: 'CASCADE' })
  @JoinColumn({ name: 'materialId' })
  material: Relation<MaterialEntity>;

  @ApiProperty() @Column() colorId: number;
  @ManyToOne(() => ColorEntity, { onDelete: 'CASCADE' })
  @JoinColumn({ name: 'colorId' })
  color: Relation<ColorEntity>;

  @ApiProperty() @Column({ length: 256 }) image: string;
}
