import { PartialType } from '@nestjs/swagger';
import { CreateProductImagesRequest } from '../create-product-images/create-product-images.request';

export class UpdateProductImagesRequest extends PartialType(CreateProductImagesRequest) {}
