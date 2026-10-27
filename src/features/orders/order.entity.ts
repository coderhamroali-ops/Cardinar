import { ApiProperty } from '@nestjs/swagger';
import { Column, Entity, JoinColumn, ManyToOne, OneToMany } from 'typeorm';
import { BaseModel } from '../../core/base-model';
import { OrderStatus, PaymentMethod } from '../../core/enum/enum';
import { BranchEntity } from '../branches/branch.entity';
import { ArticulEntity, ProductEntity } from '../catalog/catalog.entity';
import { UserEntity } from '../users/user.entity';

const money = { type: 'decimal' as const, precision: 12, scale: 2, transformer: { to: (v: number) => v, from: (v: string) => Number(v) } };

@Entity('orders')
export class OrderEntity extends BaseModel {
  @ApiProperty() @Column() userId: number;
  @ManyToOne(() => UserEntity, { onDelete: 'CASCADE' })
  @JoinColumn({ name: 'userId' })
  user: UserEntity;

  @ApiProperty() @Column() branchId: number;
  @ManyToOne(() => BranchEntity)
  @JoinColumn({ name: 'branchId' })
  branch: BranchEntity;

  @ApiProperty() @Column({ length: 64 }) fullName: string;
  @ApiProperty() @Column({ length: 16 }) phoneNumber: string;
  @ApiProperty() @Column({ length: 64, nullable: true }) email?: string;
  @ApiProperty() @Column() delivery: boolean;
  @ApiProperty({ enum: PaymentMethod }) @Column({ type: 'enum', enum: PaymentMethod }) paymentMethod: PaymentMethod;
  @ApiProperty({ enum: OrderStatus }) @Column({ type: 'enum', enum: OrderStatus, default: OrderStatus.PROCESSING }) status: OrderStatus;

  @OneToMany(() => OrderItemEntity, (item) => item.order)
  items: OrderItemEntity[];
}

@Entity('orderItems')
export class OrderItemEntity extends BaseModel {
  @ApiProperty() @Column() orderId: number;
  @ManyToOne(() => OrderEntity, (order) => order.items, { onDelete: 'CASCADE' })
  @JoinColumn({ name: 'orderId' })
  order: OrderEntity;

  @ApiProperty() @Column() productId: number;
  @ManyToOne(() => ProductEntity)
  @JoinColumn({ name: 'productId' })
  product: ProductEntity;

  @ApiProperty() @Column() articulId: number;
  @ManyToOne(() => ArticulEntity)
  @JoinColumn({ name: 'articulId' })
  articul: ArticulEntity;

  @ApiProperty() @Column({ default: 1 }) quantity: number;

  // Sxemaga qo'shildi: buyurtma paytidagi narx — keyin mahsulot narxi o'zgarsa ham tarix to'g'ri qoladi.
  @ApiProperty() @Column(money) price: number;
}
