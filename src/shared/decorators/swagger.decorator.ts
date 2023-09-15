import { Type, applyDecorators } from '@nestjs/common';
import { ApiExtraModels, ApiOkResponse, getSchemaPath } from '@nestjs/swagger';

import {
  BaseResponse,
  BaseResponseWithPagination,
} from '../response/base.response';

export const ApiOkeBaseResponse = <T extends Type<unknown>>(dataDto: T) =>
  applyDecorators(
    ApiExtraModels(BaseResponse, dataDto),
    ApiOkResponse({
      schema: {
        allOf: [
          { $ref: getSchemaPath(BaseResponse) },
          {
            properties: {
              data: {
                type: 'array',
                items: { $ref: getSchemaPath(dataDto) },
              },
            },
          },
        ],
      },
    }),
  );

export const ApiOkeBaseResponseSingle = <T extends Type<unknown>>(dataDto: T) =>
  applyDecorators(
    ApiExtraModels(BaseResponse, dataDto),
    ApiOkResponse({
      schema: {
        allOf: [
          { $ref: getSchemaPath(BaseResponse) },
          {
            properties: {
              data: { $ref: getSchemaPath(dataDto) },
            },
          },
        ],
      },
    }),
  );

export const ApiOkeBaseResponsePaginated = <T extends Type<unknown>>(
  dataDto: T,
) =>
  applyDecorators(
    ApiExtraModels(BaseResponseWithPagination, dataDto),
    ApiOkResponse({
      schema: {
        allOf: [
          { $ref: getSchemaPath(BaseResponseWithPagination) },
          {
            properties: {
              data: {
                type: 'array',
                items: { $ref: getSchemaPath(dataDto) },
              },
            },
          },
        ],
      },
    }),
  );
