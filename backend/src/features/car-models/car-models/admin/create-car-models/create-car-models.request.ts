import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import { IsInt, IsString, MaxLength } from 'class-validator';

export class CreateCarModelsRequest {

  @ApiProperty() @IsInt() carMakeId: number;
  @ApiProperty() @IsString() @MaxLength(64) title: string;
}
