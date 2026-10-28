import { PartialType } from '@nestjs/swagger';
import { CreateProductsRequest } from '../create-products/create-products.request';

export class UpdateProductsRequest extends PartialType(CreateProductsRequest) {}
