import { PartialType } from '@nestjs/swagger';
import { CreateBannersRequest } from '../create-banners/create-banners.request';

export class UpdateBannersRequest extends PartialType(CreateBannersRequest) {}
