import { ApiProperty } from '@nestjs/swagger';
import { Column, Entity, JoinColumn, ManyToOne, type Relation } from 'typeorm';
import { BaseModel } from '../../../core/base-model';
import { CustomCategory } from '../../../core/enum/enum';
import { CarMakeEntity } from '../../car-makes/entities/car-make.entity';
import { CarModelEntity } from '../../car-models/entities/car-model.entity';
import { CustomModelEntity } from '../../custom-models/entities/custom-model.entity';

// Konstruktorda yig'ilgan buyurtma (ariza) — tayyor rasm bilan
@Entity('customProducts')
export class CustomProductEntity extends BaseModel {
  @ApiProperty() @Column({ length: 64 }) fullName: string;
  @ApiProperty() @Column({ length: 16 }) phoneNumber: string;
  @ApiProperty() @Column({ length: 64, nullable: true }) email?: string;

  @ApiProperty() @Column() carMakeId: number;
  @ManyToOne(() => CarMakeEntity)
  @JoinColumn({ name: 'carMakeId' })
  carMake: Relation<CarMakeEntity>;

  @ApiProperty() @Column() carModelId: number;
  @ManyToOne(() => CarModelEntity)
  @JoinColumn({ name: 'carModelId' })
  carModel: Relation<CarModelEntity>;

  @ApiProperty({ enum: CustomCategory }) @Column({ type: 'enum', enum: CustomCategory }) category: CustomCategory;

  @ApiProperty() @Column() modelId: number;
  @ManyToOne(() => CustomModelEntity)
  @JoinColumn({ name: 'modelId' })
  model: Relation<CustomModelEntity>;

  @ApiProperty() @Column() withLogo: boolean;
  @ApiProperty() @Column({ length: 256 }) image: string;
  @ApiProperty() @Column({ default: true }) isActive: boolean;
}
