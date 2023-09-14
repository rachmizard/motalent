import {
  Controller,
  Get,
  HttpCode,
  Param,
  Query,
  Request,
} from '@nestjs/common';
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';
import { Request as ExpressRequest } from 'express';

import { Roles } from '@src/shared/decorators/role.decorator';
import { BaseParamsDTO } from '@src/shared/dtos/base-params.dto';
import { Role } from '@src/shared/enums/role.enum';
import { BaseResponseWithPagination } from '@src/shared/response/base.response';
import { GetClientSearchPreferencesByClientIdUseCase } from '../usecases/get-client-search-preferences-by-client-id.usecase';

@ApiTags('Client')
@ApiBearerAuth()
@Controller('search-preferences')
export class GetClientSearchPreferencesController {
  constructor(private usecase: GetClientSearchPreferencesByClientIdUseCase) {}

  @Get(':client_id')
  @HttpCode(200)
  @Roles(Role.CLIENT)
  async getClientSearchPreferences(
    @Query() queryParams: BaseParamsDTO,
    @Param('client_id') clientId: number,
    @Request() req: ExpressRequest,
  ) {
    const { results, totalPages } = await this.usecase.execute({
      auth: req.user,
      body: null,
      clientId,
      params: BaseParamsDTO.create(queryParams),
    });

    return BaseResponseWithPagination.paginate(results, {
      limit: Number(queryParams.getLimit()),
      page: Number(queryParams.getPage()),
      total: results.length,
      totalPages,
    });
  }
}
