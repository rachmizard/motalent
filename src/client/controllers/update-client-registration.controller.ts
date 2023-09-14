import { Body, Controller, HttpStatus, Put } from '@nestjs/common';
import {
  ApiBearerAuth,
  ApiOperation,
  ApiResponse,
  ApiTags,
} from '@nestjs/swagger';

import { Roles } from '@src/shared/decorators/role.decorator';
import { Role } from '@src/shared/enums/role.enum';
import { BaseResponse } from '@src/shared/response/base.response';
import { UpdateClientRegistrationDTO } from '../dtos/update-client-registration.dto';
import { UpdateClientRegistrationUseCase } from '../usecases/update-client-registration.usecase';

@ApiTags('Client')
@ApiBearerAuth()
@Controller()
export class UpdateClientRegistrationController {
  constructor(private readonly usecase: UpdateClientRegistrationUseCase) {}

  @ApiOperation({
    summary: 'Update client registration',
    description: 'Update client registration by client id',
  })
  @ApiResponse({ status: 400, description: 'Bad Request' })
  @ApiResponse({ status: 200, description: 'OK', type: BaseResponse.success })
  @Put('update-client-registration')
  @Roles(Role.CLIENT)
  async updateClientRegistration(@Body() body: UpdateClientRegistrationDTO) {
    await this.usecase.execute({
      body,
      clientId: body.client_id,
    });

    return BaseResponse.success(
      null,
      'Client registration updated',
      HttpStatus.OK,
    );
  }
}
