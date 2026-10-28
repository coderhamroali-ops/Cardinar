import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import { IsString, MaxLength } from 'class-validator';

export class CreateCarMakesRequest {

  @ApiProperty() @IsString() @MaxLength(64) title: string;
}
