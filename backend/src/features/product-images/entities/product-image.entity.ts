import { ApiProperty } from '@nestjs/swagger';
import { Column, Entity, JoinColumn, ManyToOne, type Relation } from 'typeorm';
import { BaseModel } from '../../../core/base-model';
import { ProductEntity } from '../../products/entities/product.entity';

@Entity('productImages')
export class ProductImageEntity extends BaseModel {
  @ApiProperty() @Column() productId: number;
  @ManyToOne(() => ProductEntity, (product) => product.images, { onDelete: 'CASCADE' })
  @JoinColumn({ name: 'productId' })
  product: Relation<ProductEntity>;

  @ApiProperty() @Column({ length: 256 }) image: string;
  @ApiProperty({ description: 'Rasmlar tartibi' }) @Column() position: number;
}
