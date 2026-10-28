import { PartialType } from '@nestjs/swagger';
import { CreateCategoriesRequest } from '../create-categories/create-categories.request';

export class UpdateCategoriesRequest extends PartialType(CreateCategoriesRequest) {}
