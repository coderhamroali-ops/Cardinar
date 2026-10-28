import { ApiProperty } from '@nestjs/swagger';
import { Column, Entity, JoinColumn, ManyToOne, type Relation } from 'typeorm';
import { BaseModel } from '../../../core/base-model';
import { ColorEntity } from '../../colors/entities/color.entity';
import { ProductEntity } from '../../products/entities/product.entity';

@Entity('productColors')
export class ProductColorEntity extends BaseModel {
  @ApiProperty() @Column() productId: number;
  @ManyToOne(() => ProductEntity, (product) => product.colors, { onDelete: 'CASCADE' })
  @JoinColumn({ name: 'productId' })
  product: Relation<ProductEntity>;

  @ApiProperty() @Column() colorId: number;
  @ManyToOne(() => ColorEntity, { onDelete: 'CASCADE' })
  @JoinColumn({ name: 'colorId' })
  color: Relation<ColorEntity>;
}
