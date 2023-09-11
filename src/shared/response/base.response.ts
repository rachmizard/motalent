import { ApiProperty } from '@nestjs/swagger';

type BaseResponseProps<T, E = any> = {
  status: 'success' | 'error';
  message: string;
  statusCode: number;
  data?: T;
  errors?: E;
};

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

  static error<T>(errors: T, message = 'Error', statusCode = 400) {
    return new BaseResponse<T>({
      message,
      status: 'error',
      statusCode,
      errors,
    });
  }
}
