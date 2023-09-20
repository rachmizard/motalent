import {
  Body,
  Controller,
  Get,
  HttpCode,
  HttpStatus,
  Post,
  Put,
  Request,
  UseGuards,
} from '@nestjs/common';

import {
  ApiBearerAuth,
  ApiOperation,
  ApiResponse,
  ApiTags,
} from '@nestjs/swagger';
import { GetAccountDTO, UpdateAccountDTO } from '@src/account/dtos';
import { ApiOkeBaseResponseSingle } from '@src/shared/decorators/swagger.decorator';
import { BaseResponse } from 'src/shared/response/base.response';
import { Public } from './auth.decorator';
import {
  SignInDTO,
  SignInResponseDTO,
  SignUpDTO,
  SignUpResponseDTO,
} from './auth.dto';
import { AuthService } from './auth.service';
import { JwtAuthGuard } from './guards/jwt-auth.guard';

@ApiTags('Authentication')
@Controller()
export class AuthController {
  constructor(private authService: AuthService) {}

  @Public()
  @HttpCode(HttpStatus.OK)
  @Post('sign-in')
  @ApiOperation({ summary: 'Sign In' })
  @ApiResponse({ status: 400, description: 'Bad Request' })
  @ApiOkeBaseResponseSingle(SignInResponseDTO)
  async signIn(@Body() signInDTO: SignInDTO) {
    const signedInResult = await this.authService.signIn(
      signInDTO.email,
      signInDTO.password,
    );

    return BaseResponse.success<SignInResponseDTO>(
      signedInResult,
      'Signed in',
      HttpStatus.OK,
    );
  }

  @Public()
  @HttpCode(HttpStatus.CREATED)
  @Post('sign-up')
  @ApiOperation({ summary: 'Sign Up' })
  @ApiResponse({ status: 400, description: 'Bad Request' })
  @ApiOkeBaseResponseSingle(SignUpResponseDTO)
  async signUp(@Body() signUpDTO: SignUpDTO) {
    const res = await this.authService.signUp(signUpDTO);

    return BaseResponse.success(res, 'Account created', HttpStatus.CREATED);
  }

  @UseGuards(JwtAuthGuard)
  @Get('profile')
  @ApiBearerAuth()
  @ApiOperation({
    summary: 'Get Profile',
    description: 'Get Profile',
  })
  @ApiOkeBaseResponseSingle(GetAccountDTO)
  async getProfile(@Request() req: any) {
    const account = await this.authService.getProfile(req.user.sub);
    return BaseResponse.success(
      account,
      'Account Retrieved Successfully',
      HttpStatus.OK,
    );
  }

  @UseGuards(JwtAuthGuard)
  @Put('update-profile')
  @ApiBearerAuth()
  @ApiOperation({
    summary: 'Update Profile',
  })
  @ApiOkeBaseResponseSingle(GetAccountDTO)
  @ApiResponse({ status: 400, description: 'Bad Request' })
  @ApiResponse({ status: 401, description: 'Unauthorized' })
  async updateProfile(@Body() body: UpdateAccountDTO) {
    await this.authService.updateProfile(body);
    return BaseResponse.success(null, 'Account Updated Successfully');
  }
}
