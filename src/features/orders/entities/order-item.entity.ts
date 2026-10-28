import { ApiProperty } from '@nestjs/swagger';
import { Column, Entity, JoinColumn, ManyToOne, type Relation } from 'typeorm';
import { BaseModel } from '../../../core/base-model';
import { ArticulEntity } from '../../articuls/entities/articul.entity';
import { ProductEntity } from '../../products/entities/product.entity';
import { OrderEntity } from './order.entity';

@Entity('orderItems')
export class OrderItemEntity extends BaseModel {
  @ApiProperty() @Column() orderId: number;
  @ManyToOne(() => OrderEntity, (order) => order.items, { onDelete: 'CASCADE' })
  @JoinColumn({ name: 'orderId' })
  order: Relation<OrderEntity>;

  @ApiProperty() @Column() productId: number;
  @ManyToOne(() => ProductEntity)
  @JoinColumn({ name: 'productId' })
  product: Relation<ProductEntity>;

  @ApiProperty() @Column() articulId: number;
  @ManyToOne(() => ArticulEntity)
  @JoinColumn({ name: 'articulId' })
  articul: Relation<ArticulEntity>;

  @ApiProperty() @Column({ default: 1 }) quantity: number;

  // Sxemaga qo'shildi: buyurtma paytidagi narx — keyin mahsulot narxi o'zgarsa ham tarix to'g'ri qoladi.
  @ApiProperty() @Column({ type: 'decimal', precision: 12, scale: 2, transformer: { to: (v: number) => v, from: (v: string) => Number(v) } }) price: number;
}
