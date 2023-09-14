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
  @IsOptional()
  page: number;

  @IsOptional()
  limit: number;

  @IsEnum(['ASC', 'DESC'], {
    message: 'Order must be ASC or DESC',
  })
  @IsOptional()
  order: string = 'ASC';

  @IsString()
  @IsOptional()
  orderBy: string = 'id';

  @IsString()
  @IsOptional()
  search: string;

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
