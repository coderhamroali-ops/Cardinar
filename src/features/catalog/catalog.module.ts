import { Controller, Get, Module, NotFoundException, Param, ParseIntPipe, Query } from '@nestjs/common';
import { ApiProperty, ApiPropertyOptional, ApiTags, PartialType } from '@nestjs/swagger';
import { Transform, Type } from 'class-transformer';
import {
  IsBoolean,
  IsEnum,
  IsHexColor,
  IsIn,
  IsInt,
  IsNumber,
  IsOptional,
  IsString,
  MaxLength,
  Min,
} from 'class-validator';
import { Brackets, In, Not } from 'typeorm';
import { AdminCrudController } from '../../core/crud.controller';
import { ProductStatus } from '../../core/enum/enum';
import { paginate, PaginationQuery } from '../../core/pagination';
import {
  ArticulEntity,
  CarMakeEntity,
  CarModelEntity,
  CategoryEntity,
  ColorEntity,
  ProductColorEntity,
  ProductEntity,
  ProductImageEntity,
} from './catalog.entity';

// ---------- DTO ----------

class CreateColorDto {
  @ApiProperty() @IsString() @MaxLength(64) title: string;
  @ApiProperty({ example: '#E31E24' }) @IsHexColor() color: string;
}
class UpdateColorDto extends PartialType(CreateColorDto) {}

class CreateCarMakeDto {
  @ApiProperty() @IsString() @MaxLength(64) title: string;
}
class UpdateCarMakeDto extends PartialType(CreateCarMakeDto) {}

class CreateCarModelDto {
  @ApiProperty() @IsInt() carMakeId: number;
  @ApiProperty() @IsString() @MaxLength(64) title: string;
}
class UpdateCarModelDto extends PartialType(CreateCarModelDto) {}

class CreateCategoryDto {
  @ApiProperty() @IsString() @MaxLength(128) title: string;
}
class UpdateCategoryDto extends PartialType(CreateCategoryDto) {}

class CreateProductDto {
  @ApiProperty() @IsInt() categoryId: number;
  @ApiProperty() @IsString() @MaxLength(128) title: string;
  @ApiProperty() @IsNumber() @Min(0) price: number;
  @ApiPropertyOptional() @IsOptional() @IsString() description?: string;
  @ApiPropertyOptional({ enum: ProductStatus }) @IsOptional() @IsEnum(ProductStatus) status?: ProductStatus;
  @ApiPropertyOptional() @IsOptional() @IsBoolean() isPremium?: boolean;
}
class UpdateProductDto extends PartialType(CreateProductDto) {}

class CreateProductImageDto {
  @ApiProperty() @IsInt() productId: number;
  @ApiProperty() @IsString() @MaxLength(256) image: string;
  @ApiProperty() @IsInt() position: number;
}
class UpdateProductImageDto extends PartialType(CreateProductImageDto) {}

class CreateArticulDto {
  @ApiProperty() @IsInt() productId: number;
  @ApiProperty() @IsInt() carModelId: number;
}
class UpdateArticulDto extends PartialType(CreateArticulDto) {}

class CreateProductColorDto {
  @ApiProperty() @IsInt() productId: number;
  @ApiProperty() @IsInt() colorId: number;
}
class UpdateProductColorDto extends PartialType(CreateProductColorDto) {}

const toIds = ({ value }: { value: unknown }) =>
  value === undefined ? undefined : String(value).split(',').map(Number).filter(Boolean);

class ProductFilter extends PaginationQuery {
  @ApiPropertyOptional() @IsOptional() @Type(() => Number) @IsInt() categoryId?: number;
  @ApiPropertyOptional({ description: 'Vergul bilan: 1,2,3' }) @IsOptional() @Transform(toIds) colorIds?: number[];
  @ApiPropertyOptional() @IsOptional() @Type(() => Number) @IsInt() carMakeId?: number;
  @ApiPropertyOptional() @IsOptional() @Type(() => Number) @IsInt() carModelId?: number;
  @ApiPropertyOptional() @IsOptional() @Type(() => Number) @IsNumber() minPrice?: number;
  @ApiPropertyOptional() @IsOptional() @Type(() => Number) @IsNumber() maxPrice?: number;
  @ApiPropertyOptional({ enum: ProductStatus }) @IsOptional() @IsEnum(ProductStatus) status?: ProductStatus;
  @ApiPropertyOptional() @IsOptional() @Transform(({ value }) => (value === undefined ? undefined : value === 'true' || value === true)) @IsBoolean() isPremium?: boolean;
  @ApiPropertyOptional() @IsOptional() @IsString() search?: string;
  @ApiPropertyOptional({ enum: ['new', 'price_asc', 'price_desc'] })
  @IsOptional()
  @IsIn(['new', 'price_asc', 'price_desc'])
  sort?: 'new' | 'price_asc' | 'price_desc';
}

// ---------- Public ----------

@ApiTags('public / catalog')
@Controller('public')
class CatalogPublicController {
  @Get('categories')
  categories() {
    return CategoryEntity.find({ order: { id: 'ASC' } });
  }

  @Get('colors')
  colors() {
    return ColorEntity.find({ order: { id: 'ASC' } });
  }

  // Marka va uning modellari birga: filtr va konstruktordagi tanlovlar uchun
  @Get('car-makes')
  carMakes() {
    return CarMakeEntity.find({ relations: { models: true }, order: { id: 'ASC', models: { id: 'ASC' } } });
  }

  @Get('products')
  async products(@Query() filter: ProductFilter) {
    const page = filter.page ?? 1;
    const size = filter.size ?? 12;

    const query = ProductEntity.createQueryBuilder('product');

    if (filter.categoryId) query.andWhere('product.categoryId = :categoryId', { categoryId: filter.categoryId });
    if (filter.status) query.andWhere('product.status = :status', { status: filter.status });
    if (filter.isPremium !== undefined) query.andWhere('product.isPremium = :isPremium', { isPremium: filter.isPremium });
    if (filter.minPrice !== undefined) query.andWhere('product.price >= :minPrice', { minPrice: filter.minPrice });
    if (filter.maxPrice !== undefined) query.andWhere('product.price <= :maxPrice', { maxPrice: filter.maxPrice });
    if (filter.search) query.andWhere('product.title ILIKE :search', { search: `%${filter.search}%` });
    if (filter.colorIds?.length) {
      query.andWhere(
        'EXISTS (SELECT 1 FROM "productColors" pc WHERE pc."productId" = product.id AND pc."colorId" IN (:...colorIds))',
        { colorIds: filter.colorIds },
      );
    }
    if (filter.carModelId || filter.carMakeId) {
      query.andWhere(
        new Brackets((qb) =>
          qb.where(
            `EXISTS (SELECT 1 FROM articuls a JOIN "carModels" m ON m.id = a."carModelId"
              WHERE a."productId" = product.id
              ${filter.carModelId ? 'AND m.id = :carModelId' : ''}
              ${filter.carMakeId ? 'AND m."carMakeId" = :carMakeId' : ''})`,
            { carModelId: filter.carModelId, carMakeId: filter.carMakeId },
          ),
        ),
      );
    }

    const order = { new: ['product.id', 'DESC'], price_asc: ['product.price', 'ASC'], price_desc: ['product.price', 'DESC'] } as const;
    const [field, direction] = order[filter.sort ?? 'new'];
    query.orderBy(field, direction).addOrderBy('product.id', 'DESC');

    // 1-bosqich: filtr va sahifa bo'yicha faqat id'lar (join'lar sanoqni buzmasligi uchun)
    const total = await query.getCount();
    const rows = await query.select('product.id', 'id').offset((page - 1) * size).limit(size).getRawMany<{ id: number }>();
    const ids = rows.map((row) => Number(row.id));

    // 2-bosqich: shu mahsulotlar rasmlari va artikullari bilan, tartib saqlangan holda
    const data = await loadProducts(ids);
    return paginate(data, total, page, size);
  }

  @Get('products/:id')
  async product(@Param('id', ParseIntPipe) id: number) {
    const product = await ProductEntity.findOne({
      where: { id },
      relations: { category: true, images: true, colors: { color: true }, articuls: { carModel: { carMake: true } } },
      order: { images: { position: 'ASC' }, articuls: { id: 'ASC' } },
    });
    if (!product) throw new NotFoundException('Product not found');
    return product;
  }

  // "Похожие товары": shu kategoriyadagi boshqa mahsulotlar
  @Get('products/:id/similar')
  async similar(@Param('id', ParseIntPipe) id: number) {
    const product = await ProductEntity.findOneBy({ id });
    if (!product) throw new NotFoundException('Product not found');
    const similar = await ProductEntity.find({
      select: { id: true },
      where: { categoryId: product.categoryId, id: Not(id) },
      order: { id: 'DESC' },
      take: 8,
    });
    return loadProducts(similar.map((p) => p.id));
  }
}

// Kartochkalar uchun: rasmlar, kategoriya va artikullar (kartochkadagi "добавить" modelni tanlashni so'raydi)
async function loadProducts(ids: number[]) {
  if (!ids.length) return [];
  const products = await ProductEntity.find({
    where: { id: In(ids) },
    relations: { images: true, category: true, articuls: { carModel: true } },
    order: { images: { position: 'ASC' }, articuls: { id: 'ASC' } },
  });
  return ids.map((id) => products.find((p) => p.id === id)).filter(Boolean);
}

@Module({
  controllers: [
    CatalogPublicController,
    AdminCrudController('colors', ColorEntity, CreateColorDto, UpdateColorDto),
    AdminCrudController('car-makes', CarMakeEntity, CreateCarMakeDto, UpdateCarMakeDto),
    AdminCrudController('car-models', CarModelEntity, CreateCarModelDto, UpdateCarModelDto, { relations: ['carMake'] }),
    AdminCrudController('categories', CategoryEntity, CreateCategoryDto, UpdateCategoryDto),
    AdminCrudController('products', ProductEntity, CreateProductDto, UpdateProductDto, { relations: ['category', 'images'] }),
    AdminCrudController('product-images', ProductImageEntity, CreateProductImageDto, UpdateProductImageDto),
    AdminCrudController('articuls', ArticulEntity, CreateArticulDto, UpdateArticulDto, { relations: ['product', 'carModel'] }),
    AdminCrudController('product-colors', ProductColorEntity, CreateProductColorDto, UpdateProductColorDto, { relations: ['color'] }),
  ],
})
export class CatalogModule {}
