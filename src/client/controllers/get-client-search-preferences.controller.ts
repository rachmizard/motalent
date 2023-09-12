import { Controller, Get, HttpCode, Param, Query } from '@nestjs/common';
import { ClientService } from '../client.service';
import { BaseResponseWithPagination } from '@src/shared/response/base.response';
import { BaseParamsDTO } from '@src/shared/dtos/base-params.dto';

@Controller('/client/search-preferences')
export class GetClientSearchPreferencesController {
  constructor(private clientService: ClientService) {}

  @Get(':client_id')
  @HttpCode(200)
  async getClientSearchPreferences(
    @Param('client_id') id: number,
    @Query() queryParams: BaseParamsDTO,
  ) {
    const { results, totalPages } =
      await this.clientService.getClientSearchPreferencesByClientId(
        id,
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
