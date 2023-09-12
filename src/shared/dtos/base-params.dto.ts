import { IsEnum, IsOptional, IsString } from 'class-validator';

interface IBaseParamsDTO {
  page: string;
  limit: string;
  order: string;
  orderBy: string;
  search: string;
  filters: Record<string, any>;
  [key: string]: any;
}

export class BaseParamsDTO {
  @IsOptional()
  private page: number = 1;

  @IsOptional()
  private limit: number = 10;

  @IsEnum(['ASC', 'DESC'], {
    message: 'Order must be ASC or DESC',
  })
  @IsOptional()
  private order: string = 'ASC';

  @IsString()
  @IsOptional()
  private orderBy: string = 'id';

  @IsString()
  @IsOptional()
  private search: string;

  @IsOptional()
  private filters: Record<string, any> = {};

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
    }
  }

  getPage(): number {
    return this.page;
  }

  getLimit(): number {
    return this.limit;
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
      page: this.page?.toString(),
      limit: this.limit.toString(),
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
