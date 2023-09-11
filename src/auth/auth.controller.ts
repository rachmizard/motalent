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
import { BaseResponseDTO } from 'src/shared/dto/base-response.dto';

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

    return BaseResponseDTO.success(signedInResult, 'Signed in', HttpStatus.OK);
  }

  @HttpCode(HttpStatus.CREATED)
  @Post('sign-up')
  @Public()
  async signUp(@Body() signUpDTO: SignUpDTO) {
    await this.authService.signUp(signUpDTO);

    return BaseResponseDTO.success(null, 'Account created', HttpStatus.CREATED);
  }

  @UseGuards(AuthGuard)
  @Get('profile')
  getProfile(@Request() req: any) {
    return BaseResponseDTO.success(
      req.user,
      'Account Retrieved Successfully',
      HttpStatus.OK,
    );
  }
}
