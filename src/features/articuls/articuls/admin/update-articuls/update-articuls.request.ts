import { PartialType } from '@nestjs/swagger';
import { CreateArticulsRequest } from '../create-articuls/create-articuls.request';

export class UpdateArticulsRequest extends PartialType(CreateArticulsRequest) {}
