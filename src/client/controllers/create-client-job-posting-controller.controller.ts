import { Body, Controller, Post, Req } from '@nestjs/common';
import { ApiBearerAuth, ApiOperation, ApiTags } from '@nestjs/swagger';
import { Roles } from '@src/shared/decorators/role.decorator';
import { ApiOkeBaseResponse } from '@src/shared/decorators/swagger.decorator';
import { Role } from '@src/shared/enums/role.enum';
import { Request } from 'express';
import { CreateClientJobPostingDTO } from '../dtos/create-client-job-posting.dto';

@ApiTags('Client')
@ApiBearerAuth()
@Controller('create-job-posting')
export class CreateClientJobPostingControllerController {
  @ApiOperation({
    summary: 'Create a job posting',
  })
  @ApiOkeBaseResponse(CreateClientJobPostingDTO)
  @Roles(Role.CLIENT)
  @Post()
  public invoke(
    @Body() body: CreateClientJobPostingDTO,
    @Req() request: Request,
  ) {}
}
