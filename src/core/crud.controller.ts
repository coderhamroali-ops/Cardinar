import {
  Body,
  Controller,
  Delete,
  Get,
  NotFoundException,
  Param,
  ParseIntPipe,
  Patch,
  Post,
  Query,
  Type,
  ValidationPipe,
} from '@nestjs/common';
import { ApiBearerAuth, ApiBody, ApiTags } from '@nestjs/swagger';
import { BaseEntity, FindOptionsOrder } from 'typeorm';
import { paginate, PaginationQuery } from './pagination';

type EntityClass<T extends BaseEntity> = { new (): T } & typeof BaseEntity;

interface CrudOptions<T> {
  relations?: string[];
  order?: FindOptionsOrder<T>;
}

const validate = (expectedType: Type) =>
  new ValidationPipe({ expectedType, whitelist: true, forbidNonWhitelisted: true, transform: true });

// Har bir jadval uchun bir xil admin CRUD: list, get, create, update, delete.
// Faqat /admin/* ostida ishlaydi, shuning uchun AuthGuard admin tokenini talab qiladi.
export function AdminCrudController<T extends BaseEntity>(
  path: string,
  entity: EntityClass<T>,
  CreateDto: Type,
  UpdateDto: Type,
  options: CrudOptions<T> = {},
) {
  @ApiTags(`admin / ${path}`)
  @ApiBearerAuth()
  @Controller(`admin/${path}`)
  class AdminCrud {
    @Get()
    async list(@Query(validate(PaginationQuery)) query: PaginationQuery) {
      const page = query.page ?? 1;
      const size = query.size ?? 20;
      const [data, total] = await (entity as any).findAndCount({
        relations: options.relations,
        order: options.order ?? { id: 'DESC' },
        take: size,
        skip: (page - 1) * size,
      });
      return paginate(data, total, page, size);
    }

    @Get(':id')
    async get(@Param('id', ParseIntPipe) id: number) {
      const item = await (entity as any).findOne({ where: { id }, relations: options.relations });
      if (!item) throw new NotFoundException(`${path} not found`);
      return item;
    }

    @Post()
    @ApiBody({ type: CreateDto })
    async create(@Body(validate(CreateDto)) payload: object) {
      return (entity as any).create(payload).save();
    }

    @Patch(':id')
    @ApiBody({ type: UpdateDto })
    async update(@Param('id', ParseIntPipe) id: number, @Body(validate(UpdateDto)) payload: object) {
      const item = await (entity as any).findOneBy({ id });
      if (!item) throw new NotFoundException(`${path} not found`);
      Object.assign(item, payload);
      return item.save();
    }

    @Delete(':id')
    async remove(@Param('id', ParseIntPipe) id: number) {
      const item = await (entity as any).findOneBy({ id });
      if (!item) throw new NotFoundException(`${path} not found`);
      await item.remove();
      return { id };
    }
  }

  return AdminCrud;
}
