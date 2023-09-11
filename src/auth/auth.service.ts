import {
  BadRequestException,
  Injectable,
  NotFoundException,
  UnauthorizedException,
} from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';

import { AccountService } from 'src/account/account.service';
import { CryptoService } from 'src/shared/crypto/crypto.service';

import { SignUpDTO } from './auth.dto';

@Injectable()
export class AuthService {
  constructor(
    private accountService: AccountService,
    private jwtService: JwtService,
    private cryptoService: CryptoService,
  ) {}

  async signIn(email: string, password: string): Promise<any> {
    const user = await this.accountService.findOne(email);

    if (!user) {
      throw new NotFoundException('User not found');
    }

    const isPasswordValid = this.cryptoService.syncComparePassword(
      password,
      user.salt,
      user.password,
    );

    if (user && !isPasswordValid) {
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

    const salt = this.cryptoService.generateSalt();

    const createdAccount = {
      name: signUpDTO.name,
      email: signUpDTO.email,
      password: await this.cryptoService.hashPassword(signUpDTO.password, salt),
      hash: salt,
      salt,
    };

    await this.accountService.create(createdAccount);

    return {
      message: 'Account created successfully',
    };
  }

  async accountExists(email: string): Promise<boolean> {
    const user = await this.accountService.findOne(email);

    return !!user;
  }
}
