import { Body, Controller, Put } from '@nestjs/common';
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';

import { UpdateClientRegistrationDTO } from '../dtos/update-client-registration.dto';

@ApiTags('Client')
@ApiBearerAuth()
@Controller()
export class UpdateClientRegistrationController {
  constructor() {}

  @Put('update-client-registration')
  async updateClientRegistration(@Body() body: UpdateClientRegistrationDTO) {
    console.log(body);
    return 'update-client-registration';
  }
}
