import { PartialType } from '@nestjs/swagger';
import { CreateCustomModelsRequest } from '../create-custom-models/create-custom-models.request';

export class UpdateCustomModelsRequest extends PartialType(CreateCustomModelsRequest) {}
