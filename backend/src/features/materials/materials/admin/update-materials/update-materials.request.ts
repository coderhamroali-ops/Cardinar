import { PartialType } from '@nestjs/swagger';
import { CreateMaterialsRequest } from '../create-materials/create-materials.request';

export class UpdateMaterialsRequest extends PartialType(CreateMaterialsRequest) {}
