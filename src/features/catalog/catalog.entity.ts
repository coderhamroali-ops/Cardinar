import { ApiProperty } from '@nestjs/swagger';
import { Column, Entity, JoinColumn, ManyToOne, OneToMany } from 'typeorm';
import { BaseModel } from '../../core/base-model';
import { ProductStatus } from '../../core/enum/enum';

const money = { type: 'decimal' as const, precision: 12, scale: 2, transformer: { to: (v: number) => v, from: (v: string) => Number(v) } };

@Entity('colors')
export class ColorEntity extends BaseModel {
  @ApiProperty() @Column({ length: 64, unique: true }) title: string;
  @ApiProperty({ description: 'HEX, masalan #FF0000' }) @Column({ length: 12, unique: true }) color: string;
}

@Entity('carMakes')
export class CarMakeEntity extends BaseModel {
  @ApiProperty() @Column({ length: 64, unique: true }) title: string;

  @OneToMany(() => CarModelEntity, (model) => model.carMake)
  models: CarModelEntity[];
}

@Entity('carModels')
export class CarModelEntity extends BaseModel {
  @ApiProperty() @Column() carMakeId: number;
  @ManyToOne(() => CarMakeEntity, (make) => make.models, { onDelete: 'CASCADE' })
  @JoinColumn({ name: 'carMakeId' })
  carMake: CarMakeEntity;

  @ApiProperty() @Column({ length: 64, unique: true }) title: string;
}

@Entity('categories')
export class CategoryEntity extends BaseModel {
  @ApiProperty() @Column({ length: 128, unique: true }) title: string;
}

@Entity('products')
export class ProductEntity extends BaseModel {
  @ApiProperty() @Column() categoryId: number;
  @ManyToOne(() => CategoryEntity, { onDelete: 'RESTRICT' })
  @JoinColumn({ name: 'categoryId' })
  category: CategoryEntity;

  @ApiProperty() @Column({ length: 128, unique: true }) title: string;
  @ApiProperty() @Column(money) price: number;
  @ApiProperty() @Column({ type: 'text', nullable: true }) description?: string;
  @ApiProperty({ enum: ProductStatus }) @Column({ type: 'enum', enum: ProductStatus, nullable: true }) status?: ProductStatus;
  @ApiProperty() @Column({ default: false }) isPremium: boolean;

  @OneToMany(() => ProductImageEntity, (image) => image.product)
  images: ProductImageEntity[];

  @OneToMany(() => ArticulEntity, (articul) => articul.product)
  articuls: ArticulEntity[];

  @OneToMany(() => ProductColorEntity, (color) => color.product)
  colors: ProductColorEntity[];
}

@Entity('productImages')
export class ProductImageEntity extends BaseModel {
  @ApiProperty() @Column() productId: number;
  @ManyToOne(() => ProductEntity, (product) => product.images, { onDelete: 'CASCADE' })
  @JoinColumn({ name: 'productId' })
  product: ProductEntity;

  @ApiProperty() @Column({ length: 256 }) image: string;
  @ApiProperty({ description: 'Rasmlar tartibi' }) @Column() position: number;
}

// Mahsulot qaysi avtomobil modeliga mos kelishi (artikul)
@Entity('articuls')
export class ArticulEntity extends BaseModel {
  @ApiProperty() @Column() productId: number;
  @ManyToOne(() => ProductEntity, (product) => product.articuls, { onDelete: 'CASCADE' })
  @JoinColumn({ name: 'productId' })
  product: ProductEntity;

  @ApiProperty() @Column() carModelId: number;
  @ManyToOne(() => CarModelEntity, { onDelete: 'CASCADE' })
  @JoinColumn({ name: 'carModelId' })
  carModel: CarModelEntity;
}

@Entity('productColors')
export class ProductColorEntity extends BaseModel {
  @ApiProperty() @Column() productId: number;
  @ManyToOne(() => ProductEntity, (product) => product.colors, { onDelete: 'CASCADE' })
  @JoinColumn({ name: 'productId' })
  product: ProductEntity;

  @ApiProperty() @Column() colorId: number;
  @ManyToOne(() => ColorEntity, { onDelete: 'CASCADE' })
  @JoinColumn({ name: 'colorId' })
  color: ColorEntity;
}
