import { Body, Controller, Post } from '@nestjs/common';
import { ApiBearerAuth, ApiOperation, ApiTags } from '@nestjs/swagger';

import { Roles } from '@src/shared/decorators/role.decorator';
import { ApiOkeBaseResponse } from '@src/shared/decorators/swagger.decorator';
import { Role } from '@src/shared/enums/role.enum';
import { BaseResponse } from '@src/shared/response/base.response';
import { CreateClientJobPostingDTO } from '../dtos/create-client-job-posting.dto';
import { CreateClientJobPostingUseCase } from '../usecases/create-client-job-posting.usecase';

@ApiTags('Client')
@ApiBearerAuth()
@Controller('create-job-posting')
export class CreateClientJobPostingControllerController {
  constructor(private readonly usecase: CreateClientJobPostingUseCase) {}

  @ApiOperation({
    summary: 'Create a job posting',
  })
  @ApiOkeBaseResponse(CreateClientJobPostingDTO)
  @Roles(Role.CLIENT)
  @Post()
  public async create(@Body() body: CreateClientJobPostingDTO) {
    await this.usecase.execute(body);
    return BaseResponse.ok(null, 'Job posting created successfully');
  }
}
