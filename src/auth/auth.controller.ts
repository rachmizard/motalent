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

import { Public } from './auth.decorator';
import { SignInDTO, SignUpDTO } from './auth.dto';
import { AuthGuard } from './auth.guard';
import { AuthService } from './auth.service';
import { BaseResponse } from 'src/shared/response/base.response';

@Controller('auth')
export class AuthController {
  constructor(private authService: AuthService) {}

  @HttpCode(HttpStatus.OK)
  @Post('sign-in')
  @Public()
  async signIn(@Body() signInDTO: SignInDTO) {
    const signedInResult = await this.authService.signIn(
      signInDTO.email,
      signInDTO.password,
    );

    return BaseResponse.success(signedInResult, 'Signed in', HttpStatus.OK);
  }

  @HttpCode(HttpStatus.CREATED)
  @Post('sign-up')
  @Public()
  async signUp(@Body() signUpDTO: SignUpDTO) {
    await this.authService.signUp(signUpDTO);

    return BaseResponse.success(null, 'Account created', HttpStatus.CREATED);
  }

  @UseGuards(AuthGuard)
  @Get('profile')
  async getProfile(@Request() req: any) {
    const account = await this.authService.getProfile(req.user.sub);
    return BaseResponse.success(
      account,
      'Account Retrieved Successfully',
      HttpStatus.OK,
    );
  }
}
