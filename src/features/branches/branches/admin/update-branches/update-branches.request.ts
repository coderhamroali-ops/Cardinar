import { PartialType } from '@nestjs/swagger';
import { CreateBranchesRequest } from '../create-branches/create-branches.request';

export class UpdateBranchesRequest extends PartialType(CreateBranchesRequest) {}
