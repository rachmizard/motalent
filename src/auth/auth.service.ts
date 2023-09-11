import {
  BadRequestException,
  Injectable,
  NotFoundException,
  UnauthorizedException,
} from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';

import { AccountService } from 'src/account/account.service';
import { SignUpDTO } from './auth.dto';

@Injectable()
export class AuthService {
  constructor(
    private accountService: AccountService,
    private jwtService: JwtService,
  ) {}

  async signIn(email: string, password: string): Promise<any> {
    const user = await this.accountService.findOne(email);

    if (!user) {
      throw new NotFoundException('User not found');
    }

    if (user && user.password !== password) {
      throw new UnauthorizedException('Wrong password');
    }

    const payload = {
      sub: user?.id ?? null,
      name: user?.name ?? null,
      email: user?.email ?? null,
    };

    return {
      access_token: await this.jwtService.signAsync(payload),
    };
  }

  async signUp(signUpDTO: SignUpDTO) {
    if (signUpDTO.password !== signUpDTO.password_confirmation) {
      throw new BadRequestException('Password confirmation does not match');
    }

    const accountExists = await this.accountExists(signUpDTO.email);
    if (accountExists) throw new BadRequestException('Email already exists');

    return await this.accountService.create({
      name: signUpDTO.name,
      email: signUpDTO.email,
      password: signUpDTO.password,
    });
  }

  async accountExists(email: string): Promise<boolean> {
    const user = await this.accountService.findOne(email);

    return !!user;
  }
}
