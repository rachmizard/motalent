import { Body, Controller, Param, Put } from '@nestjs/common';
import { ApiBearerAuth, ApiOperation, ApiTags } from '@nestjs/swagger';

import { ApiOkeBaseResponseSingle } from '@src/shared/decorators/swagger.decorator';

import { BaseResponse } from '@src/shared/response/base.response';
import { UpdateClientDTO } from '../dtos/update-client.dto';
import { UpdateClientUseCase } from '../usecases/update-client.usecase';

@ApiTags('Client')
@ApiBearerAuth()
@Controller('update-client')
export class UpdateClientController {
  constructor(private usecase: UpdateClientUseCase) {}

  @Put(':clientId')
  @ApiOperation({ summary: 'Update client' })
  @ApiOkeBaseResponseSingle(UpdateClientDTO)
  async updateClient(
    @Param('clientId') clientId: string,
    @Body() body: UpdateClientDTO,
  ) {
    await this.usecase.execute({
      clientId,
      body,
    });

    return BaseResponse.success(body, 'Client updated');
  }
}
