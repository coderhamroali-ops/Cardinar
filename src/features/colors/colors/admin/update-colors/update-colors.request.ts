import { PartialType } from '@nestjs/swagger';
import { CreateColorsRequest } from '../create-colors/create-colors.request';

export class UpdateColorsRequest extends PartialType(CreateColorsRequest) {}
