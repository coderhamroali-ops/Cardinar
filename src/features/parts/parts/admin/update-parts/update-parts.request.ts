import { PartialType } from '@nestjs/swagger';
import { CreatePartsRequest } from '../create-parts/create-parts.request';

export class UpdatePartsRequest extends PartialType(CreatePartsRequest) {}
