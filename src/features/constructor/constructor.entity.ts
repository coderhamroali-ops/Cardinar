import { ApiProperty } from '@nestjs/swagger';
import { Column, Entity, JoinColumn, ManyToOne } from 'typeorm';
import { BaseModel } from '../../core/base-model';
import { CustomCategory, PartType } from '../../core/enum/enum';
import { CarMakeEntity, CarModelEntity, ColorEntity } from '../catalog/catalog.entity';

@Entity('materials')
export class MaterialEntity extends BaseModel {
  @ApiProperty() @Column({ length: 64, unique: true }) title: string;
  @ApiProperty() @Column({ length: 512, nullable: true }) description?: string;
}

// Konstruktordagi asosiy model (Классика, Ромб, Полоса ...) — bazaviy rasm bilan
@Entity('customModels')
export class CustomModelEntity extends BaseModel {
  @ApiProperty({ enum: CustomCategory }) @Column({ type: 'enum', enum: CustomCategory }) category: CustomCategory;
  @ApiProperty() @Column({ length: 128, unique: true }) title: string;
  @ApiProperty() @Column({ length: 256 }) image: string;
}

// Bazaviy rasm ustiga qo'yiladigan qatlam: qism + material + rang
@Entity('parts')
export class PartEntity extends BaseModel {
  @ApiProperty({ enum: CustomCategory }) @Column({ type: 'enum', enum: CustomCategory }) category: CustomCategory;
  @ApiProperty({ enum: PartType }) @Column({ type: 'enum', enum: PartType }) part: PartType;
  @ApiProperty() @Column({ length: 128, nullable: true }) title?: string;

  @ApiProperty() @Column() materialId: number;
  @ManyToOne(() => MaterialEntity, { onDelete: 'CASCADE' })
  @JoinColumn({ name: 'materialId' })
  material: MaterialEntity;

  @ApiProperty() @Column() colorId: number;
  @ManyToOne(() => ColorEntity, { onDelete: 'CASCADE' })
  @JoinColumn({ name: 'colorId' })
  color: ColorEntity;

  @ApiProperty() @Column({ length: 256 }) image: string;
}

// Konstruktorda yig'ilgan buyurtma (ariza) — tayyor rasm bilan
@Entity('customProducts')
export class CustomProductEntity extends BaseModel {
  @ApiProperty() @Column({ length: 64 }) fullName: string;
  @ApiProperty() @Column({ length: 16 }) phoneNumber: string;
  @ApiProperty() @Column({ length: 64, nullable: true }) email?: string;

  @ApiProperty() @Column() carMakeId: number;
  @ManyToOne(() => CarMakeEntity)
  @JoinColumn({ name: 'carMakeId' })
  carMake: CarMakeEntity;

  @ApiProperty() @Column() carModelId: number;
  @ManyToOne(() => CarModelEntity)
  @JoinColumn({ name: 'carModelId' })
  carModel: CarModelEntity;

  @ApiProperty({ enum: CustomCategory }) @Column({ type: 'enum', enum: CustomCategory }) category: CustomCategory;

  @ApiProperty() @Column() modelId: number;
  @ManyToOne(() => CustomModelEntity)
  @JoinColumn({ name: 'modelId' })
  model: CustomModelEntity;

  @ApiProperty() @Column() withLogo: boolean;
  @ApiProperty() @Column({ length: 256 }) image: string;
  @ApiProperty() @Column({ default: true }) isActive: boolean;
}
