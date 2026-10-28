import { PartialType } from '@nestjs/swagger';
import { CreateProductColorsRequest } from '../create-product-colors/create-product-colors.request';

export class UpdateProductColorsRequest extends PartialType(CreateProductColorsRequest) {}
