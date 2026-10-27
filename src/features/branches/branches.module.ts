import { Controller, Get, Module, Query } from '@nestjs/common';
import { ApiProperty, ApiPropertyOptional, ApiTags, PartialType } from '@nestjs/swagger';
import { IsBoolean, IsEnum, IsNumber, IsOptional, IsString, MaxLength } from 'class-validator';
import { AdminCrudController } from '../../core/crud.controller';
import { BranchType } from '../../core/enum/enum';
import { BranchEntity } from './branch.entity';

class CreateBranchDto {
  @ApiProperty() @IsString() @MaxLength(128) title: string;
  @ApiProperty() @IsString() @MaxLength(128) address: string;
  @ApiPropertyOptional() @IsOptional() @IsString() @MaxLength(64) district?: string;
  @ApiProperty() @IsString() @MaxLength(64) region: string;
  @ApiProperty() @IsString() @MaxLength(16) phoneNumber: string;
  @ApiProperty() @IsNumber() longitude: number;
  @ApiProperty() @IsNumber() latitude: number;
  @ApiPropertyOptional() @IsOptional() @IsBoolean() isActive?: boolean;
  @ApiProperty({ enum: BranchType }) @IsEnum(BranchType) branchType: BranchType;
}
class UpdateBranchDto extends PartialType(CreateBranchDto) {}

class BranchFilter {
  @ApiPropertyOptional({ enum: BranchType }) @IsOptional() @IsEnum(BranchType) branchType?: BranchType;
  @ApiPropertyOptional() @IsOptional() @IsString() region?: string;
}

// "Где купить?" sahifasi: rasmiy do'konlar va hamkorlar
@ApiTags('public / branches')
@Controller('public/branches')
class BranchesPublicController {
  @Get()
  list(@Query() filter: BranchFilter) {
    return BranchEntity.find({
      where: { isActive: true, branchType: filter.branchType, region: filter.region },
      order: { branchType: 'ASC', id: 'ASC' },
    });
  }
}

@Module({
  controllers: [
    BranchesPublicController,
    AdminCrudController('branches', BranchEntity, CreateBranchDto, UpdateBranchDto),
  ],
})
export class BranchesModule {}
