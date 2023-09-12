import {
  Controller,
  Get,
  HttpCode,
  Param,
  Query,
  UseGuards,
} from '@nestjs/common';
import { Roles } from '@src/shared/decorators/role.decorator';
import { BaseParamsDTO } from '@src/shared/dtos/base-params.dto';
import { Role } from '@src/shared/enums/role.enum';
import { BaseResponseWithPagination } from '@src/shared/response/base.response';
import { ClientService } from '../client.service';
import { RoleGuard } from '@src/shared/guards/role/role.guard';

@Controller('/client/search-preferences')
export class GetClientSearchPreferencesController {
  constructor(private clientService: ClientService) {}

  @UseGuards(RoleGuard)
  @Roles(Role.CLIENT)
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
