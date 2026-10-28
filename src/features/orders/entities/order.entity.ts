import { ApiProperty } from '@nestjs/swagger';
import { Column, Entity, JoinColumn, ManyToOne, OneToMany, type Relation } from 'typeorm';
import { BaseModel } from '../../../core/base-model';
import { OrderStatus, PaymentMethod } from '../../../core/enum/enum';
import { BranchEntity } from '../../branches/entities/branch.entity';
import { UserEntity } from '../../users/entities/user.entity';
import { OrderItemEntity } from './order-item.entity';

@Entity('orders')
export class OrderEntity extends BaseModel {
  @ApiProperty() @Column() userId: number;
  @ManyToOne(() => UserEntity, { onDelete: 'CASCADE' })
  @JoinColumn({ name: 'userId' })
  user: Relation<UserEntity>;

  @ApiProperty() @Column() branchId: number;
  @ManyToOne(() => BranchEntity)
  @JoinColumn({ name: 'branchId' })
  branch: Relation<BranchEntity>;

  @ApiProperty() @Column({ length: 64 }) fullName: string;
  @ApiProperty() @Column({ length: 16 }) phoneNumber: string;
  @ApiProperty() @Column({ length: 64, nullable: true }) email?: string;
  @ApiProperty() @Column() delivery: boolean;
  @ApiProperty({ enum: PaymentMethod }) @Column({ type: 'enum', enum: PaymentMethod }) paymentMethod: PaymentMethod;
  @ApiProperty({ enum: OrderStatus }) @Column({ type: 'enum', enum: OrderStatus, default: OrderStatus.PROCESSING }) status: OrderStatus;

  @OneToMany(() => OrderItemEntity, (item) => item.order)
  items: Relation<OrderItemEntity[]>;
}
