import { ApiProperty } from '@nestjs/swagger';
import { Column, Entity, OneToMany, type Relation } from 'typeorm';
import { BaseModel } from '../../../core/base-model';
import { CarModelEntity } from '../../car-models/entities/car-model.entity';

@Entity('carMakes')
export class CarMakeEntity extends BaseModel {
  @ApiProperty() @Column({ length: 64, unique: true }) title: string;

  @OneToMany(() => CarModelEntity, (model) => model.carMake)
  models: Relation<CarModelEntity[]>;
}
