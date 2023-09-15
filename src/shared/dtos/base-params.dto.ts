import { ApiProperty } from '@nestjs/swagger';
import { IsEnum, IsOptional, IsString } from 'class-validator';

interface IBaseParamsDTO {
  page: number;
  limit: number;
  order: string;
  orderBy: string;
  search: string;
  filters: Record<string, any>;
  [key: string]: any;
}

export class BaseParamsDTO implements IBaseParamsDTO {
  @ApiProperty({
    name: 'page',
    type: 'number',
    default: 1,
  })
  @IsOptional()
  page: number;

  @ApiProperty({
    name: 'limit',
    type: 'number',
    default: 10,
  })
  @IsOptional()
  limit: number;

  @ApiProperty({
    name: 'order',
    type: 'string',
    enum: ['ASC', 'DESC'],
    default: 'ASC',
  })
  @IsEnum(['ASC', 'DESC'], {
    message: 'Order must be ASC or DESC',
  })
  @IsOptional()
  order: string = 'ASC';

  @ApiProperty({
    name: 'orderBy',
    type: 'string',
    default: 'id',
  })
  @IsString()
  @IsOptional()
  orderBy: string = 'id';

  @ApiProperty({
    name: 'search',
    type: 'string',
    default: '',
  })
  @IsString()
  @IsOptional()
  search: string;

  @ApiProperty({
    name: 'filters',
    type: 'object',
    default: {},
  })
  @IsOptional()
  filters: Record<string, any> = {};

  [key: string]: any;

  constructor(props?: IBaseParamsDTO) {
    if (props) {
      this.page = Number(props.page);
      this.limit = Number(props.limit);
      this.order = props.order;
      this.orderBy = props.orderBy;
      this.search = props.search;
      this.filters = props.filters;

      if (this.page < 1) {
        this.page = 1;
      }

      if (this.limit < 1) {
        this.limit = 10;
      }
    }
  }

  getPage(): number {
    return this.page || 1;
  }

  getLimit(): number {
    return this.limit || 10;
  }

  getOrder(): string {
    return this.order;
  }

  getOrderBy(): string {
    return this.orderBy;
  }

  getSearch(): string {
    return this.search;
  }

  getParams(): IBaseParamsDTO {
    return {
      page: this.page,
      limit: this.limit,
      order: this.order,
      orderBy: this.orderBy,
      search: this.search,
      filters: this.filters,
    };
  }

  getFilters(): Record<string, any> {
    return this.filters;
  }

  public static create(params: IBaseParamsDTO): BaseParamsDTO {
    return new BaseParamsDTO(params);
  }
}
