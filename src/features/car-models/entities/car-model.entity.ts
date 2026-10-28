import { ApiProperty } from '@nestjs/swagger';
import { Column, Entity, JoinColumn, ManyToOne, type Relation } from 'typeorm';
import { BaseModel } from '../../../core/base-model';
import { CarMakeEntity } from '../../car-makes/entities/car-make.entity';

@Entity('carModels')
export class CarModelEntity extends BaseModel {
  @ApiProperty() @Column() carMakeId: number;
  @ManyToOne(() => CarMakeEntity, (make) => make.models, { onDelete: 'CASCADE' })
  @JoinColumn({ name: 'carMakeId' })
  carMake: Relation<CarMakeEntity>;

  @ApiProperty() @Column({ length: 64, unique: true }) title: string;
}
