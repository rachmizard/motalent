import { Injectable } from '@nestjs/common';
import { FindManyOptions } from 'typeorm';
import { BaseParamsDTO } from '../dtos/base-params.dto';

@Injectable()
export class PaginationAndFilterService<Entity> {
  applyPaginationAndFilter(
    options: FindManyOptions<Entity>,
    params: BaseParamsDTO,
  ): FindManyOptions<Entity> {
    if (params.getSearch()) {
      options.where['search'] = params.getSearch();
    }

    if (params.getFilters()) {
      options.where = {
        ...options.where,
        ...params.getFilters(),
      };
    }

    if (params.getOrder() && params.getOrderBy()) {
      // options.order['id'] = params.getOrder() || 'ASC';
    }

    if (params.getLimit() && params.getPage()) {
      options.skip = (params.getPage() - 1) * params.getLimit();
      options.take = params.getLimit();
    }

    return options;
  }
}
