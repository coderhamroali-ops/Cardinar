import { ApiProperty } from '@nestjs/swagger';
import { Column, Entity, JoinColumn, ManyToOne, OneToMany, type Relation } from 'typeorm';
import { BaseModel } from '../../../core/base-model';
import { ProductStatus } from '../../../core/enum/enum';
import { ArticulEntity } from '../../articuls/entities/articul.entity';
import { CategoryEntity } from '../../categories/entities/category.entity';
import { ProductColorEntity } from '../../product-colors/entities/product-color.entity';
import { ProductImageEntity } from '../../product-images/entities/product-image.entity';

@Entity('products')
export class ProductEntity extends BaseModel {
  @ApiProperty() @Column() categoryId: number;
  @ManyToOne(() => CategoryEntity, { onDelete: 'RESTRICT' })
  @JoinColumn({ name: 'categoryId' })
  category: Relation<CategoryEntity>;

  @ApiProperty() @Column({ length: 128, unique: true }) title: string;
  @ApiProperty() @Column({ type: 'decimal', precision: 12, scale: 2, transformer: { to: (v: number) => v, from: (v: string) => Number(v) } }) price: number;
  @ApiProperty() @Column({ type: 'text', nullable: true }) description?: string;
  @ApiProperty({ enum: ProductStatus }) @Column({ type: 'enum', enum: ProductStatus, nullable: true }) status?: ProductStatus;
  @ApiProperty() @Column({ default: false }) isPremium: boolean;

  @OneToMany(() => ProductImageEntity, (image) => image.product)
  images: Relation<ProductImageEntity[]>;

  @OneToMany(() => ArticulEntity, (articul) => articul.product)
  articuls: Relation<ArticulEntity[]>;

  @OneToMany(() => ProductColorEntity, (color) => color.product)
  colors: Relation<ProductColorEntity[]>;
}
