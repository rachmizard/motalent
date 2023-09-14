import {
  Controller,
  Get,
  HttpCode,
  Param,
  Query,
  Request,
} from '@nestjs/common';
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';

import { Roles } from '@src/shared/decorators/role.decorator';
import { BaseParamsDTO } from '@src/shared/dtos/base-params.dto';
import { Role } from '@src/shared/enums/role.enum';
import { BaseResponseWithPagination } from '@src/shared/response/base.response';
import { Request as ExpressRequest } from 'express';
import { ClientService } from '../client.service';

@ApiTags('Client')
@ApiBearerAuth()
@Controller('search-preferences')
export class GetClientSearchPreferencesController {
  constructor(private clientService: ClientService) {}

  @Get(':client_id')
  @HttpCode(200)
  @Roles(Role.CLIENT)
  async getClientSearchPreferences(
    @Request() req: ExpressRequest,
    @Param('client_id') id: number,
    @Query() queryParams: BaseParamsDTO,
  ) {
    const { results, totalPages } =
      await this.clientService.getClientSearchPreferencesByClientId(
        id,
        req.user,
        queryParams,
      );

    return BaseResponseWithPagination.paginate(results, {
      limit: Number(queryParams.getLimit()),
      page: Number(queryParams.getPage()),
      total: results.length,
      totalPages,
    });
  }
}
