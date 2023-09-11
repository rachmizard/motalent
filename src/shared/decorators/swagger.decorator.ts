import { applyDecorators } from '@nestjs/common';
import { ApiResponse } from '@nestjs/swagger';
import { BaseResponse } from '../response/base.response';

type SwaggerBaseResponseProps = {
  statusCode?: number;
  description?: string;
};

export function SwaggerBaseResponse(props: SwaggerBaseResponseProps) {
  const { statusCode, description } = props || {};

  return applyDecorators(
    ApiResponse({
      type: BaseResponse,
      description,
      status: statusCode,
    }),
  );
}
