import { ApiProperty } from '@nestjs/swagger';
import { Column, Entity, JoinColumn, ManyToOne, type Relation } from 'typeorm';
import { BaseModel } from '../../../core/base-model';
import { ArticulEntity } from '../../articuls/entities/articul.entity';
import { ProductEntity } from '../../products/entities/product.entity';
import { UserEntity } from '../../users/entities/user.entity';

// Sxemaga userId qo'shildi: Figma'dagi "Выход" sahifasiga ko'ra savat
// foydalanuvchiga bog'lanadi va keyingi kirishda tiklanadi.
@Entity('cartItems')
export class CartItemEntity extends BaseModel {
  @ApiProperty() @Column() userId: number;
  @ManyToOne(() => UserEntity, { onDelete: 'CASCADE' })
  @JoinColumn({ name: 'userId' })
  user: Relation<UserEntity>;

  @ApiProperty() @Column() productId: number;
  @ManyToOne(() => ProductEntity, { onDelete: 'CASCADE' })
  @JoinColumn({ name: 'productId' })
  product: Relation<ProductEntity>;

  @ApiProperty() @Column() articulId: number;
  @ManyToOne(() => ArticulEntity, { onDelete: 'CASCADE' })
  @JoinColumn({ name: 'articulId' })
  articul: Relation<ArticulEntity>;

  @ApiProperty() @Column({ default: 1 }) quantity: number;
}
