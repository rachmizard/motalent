import { HttpStatus } from '@nestjs/common';
import { ApiProperty } from '@nestjs/swagger';

type BaseResponseProps<T, E = any> = {
  status: 'success' | 'error';
  message: string;
  statusCode: number;
  data?: T;
  errors?: E;
};

type BaseResponseMetaDataProps = {
  total: number;
  page: number;
  limit: number;
  totalPages: number;
  [key: string]: any;
};

export class BaseResponseMetaData implements BaseResponseMetaDataProps {
  [key: string]: any;

  @ApiProperty({
    example: 0,
  })
  total: number;

  @ApiProperty({
    example: 1,
  })
  page: number;

  @ApiProperty({
    example: 10,
  })
  limit: number;

  @ApiProperty({
    example: 1,
  })
  totalPages: number;
}

export class BaseResponse<T, E = any> {
  @ApiProperty({
    type: String,
    enum: ['success', 'error'],
    example: 'success',
    description: 'Status of the response',
  })
  status: 'success' | 'error';

  @ApiProperty({
    example: 'Success',
    description: 'Message of the response',
  })
  message: string;

  @ApiProperty({
    example: 200,
    description: 'Status code of the response',
  })
  statusCode: number;

  @ApiProperty({
    description: 'Data of the response',
  })
  data?: T;

  @ApiProperty({
    description: 'Errors of the response',
  })
  errors?: E;

  constructor(props: BaseResponseProps<T, E>) {
    this.status = props.status;
    this.message = props.message;
    this.statusCode = props.statusCode;
    this.data = props.data;
    this.errors = props.errors;
  }

  public success(data: T, message = 'Success', statusCode = 200) {
    this.status = 'success';
    this.message = message;
    this.statusCode = statusCode;
    this.data = data;
    return this;
  }

  public error(errors: E, message = 'Error', statusCode = 400) {
    this.status = 'error';
    this.message = message;
    this.statusCode = statusCode;
    this.errors = errors;
    return this;
  }

  static success<T>(data: T, message = 'Success', statusCode = 200) {
    return new BaseResponse<T>({
      message,
      status: 'success',
      statusCode,
      data,
    });
  }

  static ok<T>(data: T, message = 'Success', statusCode = HttpStatus.OK) {
    return new BaseResponse<T>({
      message,
      status: 'success',
      statusCode,
      data,
    });
  }

  static error<T>(errors: T, message = 'Error', statusCode = 400) {
    return new BaseResponse<T>({
      message,
      status: 'error',
      statusCode,
      errors,
    });
  }
}

export class BaseResponseWithPagination<T, E> extends BaseResponse<T, E> {
  @ApiProperty({
    name: 'meta',
    description: 'Meta data of the response',
  })
  meta: BaseResponseMetaData;

  constructor(props: BaseResponseProps<T, E>) {
    super(props);

    this.meta = {
      total: 0,
      page: 1,
      limit: 10,
      totalPages: 1,
    };
  }

  public static paginate<T, E>(data: T, metaData: BaseResponseMetaDataProps) {
    const response = new BaseResponseWithPagination<T, E>({
      message: 'Success',
      status: 'success',
      statusCode: HttpStatus.OK,
      data,
    });

    response.meta = metaData;

    return response;
  }
}
