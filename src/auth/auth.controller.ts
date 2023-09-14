import {
  Body,
  Controller,
  Get,
  HttpCode,
  HttpStatus,
  Post,
  Request,
  UseGuards,
} from '@nestjs/common';

import {
  ApiBearerAuth,
  ApiOperation,
  ApiResponse,
  ApiTags,
} from '@nestjs/swagger';
import { BaseResponse } from 'src/shared/response/base.response';
import { Public } from './auth.decorator';
import { SignInDTO, SignInResponseDTO, SignUpDTO } from './auth.dto';
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
  @ApiResponse({ status: 200, description: 'OK', type: null })
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
  @ApiResponse({ status: 200, description: 'OK', type: null })
  async signUp(@Body() signUpDTO: SignUpDTO) {
    await this.authService.signUp(signUpDTO);

    return BaseResponse.success(null, 'Account created', HttpStatus.CREATED);
  }

  @UseGuards(JwtAuthGuard)
  @Get('profile')
  @ApiBearerAuth()
  @ApiOperation({
    summary: 'Get Profile',
    description: 'Get Profile',
  })
  async getProfile(@Request() req: any) {
    const account = await this.authService.getProfile(req.user.sub);
    return BaseResponse.success(
      account,
      'Account Retrieved Successfully',
      HttpStatus.OK,
    );
  }
}
