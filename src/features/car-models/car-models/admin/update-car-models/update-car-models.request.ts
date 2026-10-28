import { PartialType } from '@nestjs/swagger';
import { CreateCarModelsRequest } from '../create-car-models/create-car-models.request';

export class UpdateCarModelsRequest extends PartialType(CreateCarModelsRequest) {}
