import { ApiProperty } from '@nestjs/swagger';
import { IsEnum } from 'class-validator';
import { CustomCategory } from '../../../../../core/enum/enum';

export class GetConstructorOptionsRequest {
  @ApiProperty({ enum: CustomCategory }) @IsEnum(CustomCategory) category: CustomCategory;
}
