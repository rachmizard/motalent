import {
  ExceptionFilter,
  Catch,
  ArgumentsHost,
  HttpException,
} from '@nestjs/common';
import { Response } from 'express';
import { BaseResponse } from '../dto/base-response.dto';

@Catch(HttpException)
export class BaseExceptionFilter implements ExceptionFilter {
  catch(exception: HttpException, host: ArgumentsHost) {
    const ctx = host.switchToHttp();
    const response = ctx.getResponse<Response>();
    const status = exception.getStatus();
    const message = exception.message || 'Internal Server Error';

    response.status(status).json(
      new BaseResponse({
        message,
        status: status >= 400 && status < 500 ? 'error' : 'success',
        statusCode: status,
        data: null,
        errors: exception.getResponse(),
      }),
    );
  }
}
