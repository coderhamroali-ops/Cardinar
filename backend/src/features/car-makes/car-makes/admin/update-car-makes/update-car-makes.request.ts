import { PartialType } from '@nestjs/swagger';
import { CreateCarMakesRequest } from '../create-car-makes/create-car-makes.request';

export class UpdateCarMakesRequest extends PartialType(CreateCarMakesRequest) {}
