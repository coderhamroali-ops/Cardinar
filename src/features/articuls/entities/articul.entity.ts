import { ApiProperty } from '@nestjs/swagger';
import { Column, Entity, JoinColumn, ManyToOne, type Relation } from 'typeorm';
import { BaseModel } from '../../../core/base-model';
import { CarModelEntity } from '../../car-models/entities/car-model.entity';
import { ProductEntity } from '../../products/entities/product.entity';

// Mahsulot qaysi avtomobil modeliga mos kelishi (artikul)
@Entity('articuls')
export class ArticulEntity extends BaseModel {
  @ApiProperty() @Column() productId: number;
  @ManyToOne(() => ProductEntity, (product) => product.articuls, { onDelete: 'CASCADE' })
  @JoinColumn({ name: 'productId' })
  product: Relation<ProductEntity>;

  @ApiProperty() @Column() carModelId: number;
  @ManyToOne(() => CarModelEntity, { onDelete: 'CASCADE' })
  @JoinColumn({ name: 'carModelId' })
  carModel: Relation<CarModelEntity>;
}
