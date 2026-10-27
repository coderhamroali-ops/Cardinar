import { ApiProperty } from '@nestjs/swagger';
import { Column, Entity, JoinColumn, ManyToOne } from 'typeorm';
import { BaseModel } from '../../core/base-model';
import { ArticulEntity, ProductEntity } from '../catalog/catalog.entity';
import { UserEntity } from '../users/user.entity';

// Sxemaga userId qo'shildi: Figma'dagi "Выход" sahifasiga ko'ra savat
// foydalanuvchiga bog'lanadi va keyingi kirishda tiklanadi.
@Entity('cartItems')
export class CartItemEntity extends BaseModel {
  @ApiProperty() @Column() userId: number;
  @ManyToOne(() => UserEntity, { onDelete: 'CASCADE' })
  @JoinColumn({ name: 'userId' })
  user: UserEntity;

  @ApiProperty() @Column() productId: number;
  @ManyToOne(() => ProductEntity, { onDelete: 'CASCADE' })
  @JoinColumn({ name: 'productId' })
  product: ProductEntity;

  @ApiProperty() @Column() articulId: number;
  @ManyToOne(() => ArticulEntity, { onDelete: 'CASCADE' })
  @JoinColumn({ name: 'articulId' })
  articul: ArticulEntity;

  @ApiProperty() @Column({ default: 1 }) quantity: number;
}
