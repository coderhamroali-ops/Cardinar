import { BadRequestException, Body, Controller, Get, Module, Post, Query } from '@nestjs/common';
import { ApiProperty, ApiPropertyOptional, ApiTags, PartialType } from '@nestjs/swagger';
import { IsBoolean, IsEmail, IsEnum, IsInt, IsOptional, IsString, Matches, MaxLength, MinLength } from 'class-validator';
import { randomUUID } from 'crypto';
import * as fs from 'fs';
import * as path from 'path';
import { AdminCrudController } from '../../core/crud.controller';
import { CustomCategory, PartType } from '../../core/enum/enum';
import { CarModelEntity } from '../catalog/catalog.entity';
import { PHONE_REGEX } from '../requests/requests.module';
import { CustomModelEntity, CustomProductEntity, MaterialEntity, PartEntity } from './constructor.entity';

class CreateMaterialDto {
  @ApiProperty() @IsString() @MaxLength(64) title: string;
  @ApiPropertyOptional() @IsOptional() @IsString() @MaxLength(512) description?: string;
}
class UpdateMaterialDto extends PartialType(CreateMaterialDto) {}

class CreateCustomModelDto {
  @ApiProperty({ enum: CustomCategory }) @IsEnum(CustomCategory) category: CustomCategory;
  @ApiProperty() @IsString() @MaxLength(128) title: string;
  @ApiProperty() @IsString() @MaxLength(256) image: string;
}
class UpdateCustomModelDto extends PartialType(CreateCustomModelDto) {}

class CreatePartDto {
  @ApiProperty({ enum: CustomCategory }) @IsEnum(CustomCategory) category: CustomCategory;
  @ApiProperty({ enum: PartType }) @IsEnum(PartType) part: PartType;
  @ApiPropertyOptional() @IsOptional() @IsString() @MaxLength(128) title?: string;
  @ApiProperty() @IsInt() materialId: number;
  @ApiProperty() @IsInt() colorId: number;
  @ApiProperty() @IsString() @MaxLength(256) image: string;
}
class UpdatePartDto extends PartialType(CreatePartDto) {}

class SubmitCustomProductDto {
  @ApiProperty() @IsString() @MinLength(2) @MaxLength(64) fullName: string;
  @ApiProperty() @Matches(PHONE_REGEX) phoneNumber: string;
  @ApiPropertyOptional() @IsOptional() @IsEmail() @MaxLength(64) email?: string;
  @ApiProperty() @IsInt() carMakeId: number;
  @ApiProperty() @IsInt() carModelId: number;
  @ApiProperty({ enum: CustomCategory }) @IsEnum(CustomCategory) category: CustomCategory;
  @ApiProperty() @IsInt() modelId: number;
  @ApiProperty() @IsBoolean() withLogo: boolean;
  @ApiProperty({ description: 'Konstruktorda yig\'ilgan rasm: data:image/jpeg;base64,...' })
  @IsString()
  image: string;
}

class AdminUpdateCustomProductDto {
  @ApiPropertyOptional() @IsOptional() @IsBoolean() isActive?: boolean;
}

class ConstructorQuery {
  @ApiProperty({ enum: CustomCategory }) @IsEnum(CustomCategory) category: CustomCategory;
}

const MAX_IMAGE_BYTES = 3 * 1024 * 1024;

function saveDataUrl(dataUrl: string): string {
  const match = /^data:image\/(jpeg|png);base64,(.+)$/.exec(dataUrl);
  if (!match) throw new BadRequestException('Image must be a JPEG or PNG data URL');
  const buffer = Buffer.from(match[2], 'base64');
  if (buffer.length > MAX_IMAGE_BYTES) throw new BadRequestException('Image is too large');

  const dir = path.join(process.cwd(), 'uploads', 'custom');
  fs.mkdirSync(dir, { recursive: true });
  const fileName = `${randomUUID()}.${match[1] === 'jpeg' ? 'jpg' : 'png'}`;
  fs.writeFileSync(path.join(dir, fileName), buffer);
  return `uploads/custom/${fileName}`;
}

@ApiTags('public / constructor')
@Controller('public/constructor')
class ConstructorPublicController {
  // Konstruktor sahifasi uchun hamma narsa: modellar, qatlamlar, materiallar
  @Get()
  async options(@Query() query: ConstructorQuery) {
    const [models, parts, materials] = await Promise.all([
      CustomModelEntity.find({ where: { category: query.category }, order: { id: 'ASC' } }),
      PartEntity.find({ where: { category: query.category }, relations: { color: true }, order: { id: 'ASC' } }),
      MaterialEntity.find({ order: { id: 'ASC' } }),
    ]);
    return { models, parts, materials };
  }

  // "Оставить заявку": tayyor rasm bilan konstruktor buyurtmasi
  @Post()
  async submit(@Body() payload: SubmitCustomProductDto) {
    const model = await CustomModelEntity.findOneBy({ id: payload.modelId, category: payload.category });
    if (!model) throw new BadRequestException('Model not found');
    const carModel = await CarModelEntity.findOneBy({ id: payload.carModelId, carMakeId: payload.carMakeId });
    if (!carModel) throw new BadRequestException('Car model does not belong to this make');

    const product = await CustomProductEntity.create({ ...payload, image: saveDataUrl(payload.image) }).save();
    return { id: product.id };
  }
}

@Module({
  controllers: [
    ConstructorPublicController,
    AdminCrudController('materials', MaterialEntity, CreateMaterialDto, UpdateMaterialDto),
    AdminCrudController('custom-models', CustomModelEntity, CreateCustomModelDto, UpdateCustomModelDto),
    AdminCrudController('parts', PartEntity, CreatePartDto, UpdatePartDto, { relations: ['material', 'color'] }),
    AdminCrudController('custom-products', CustomProductEntity, SubmitCustomProductDto, AdminUpdateCustomProductDto, {
      relations: ['carMake', 'carModel', 'model'],
    }),
  ],
})
export class ConstructorModule {}
