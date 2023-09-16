import {
  BadRequestException,
  Injectable,
  NotFoundException,
  UnauthorizedException,
} from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';

import { AccountService } from 'src/account/account.service';
import { CryptoService } from 'src/shared/crypto/crypto.service';

import { SignInResponseDTO, SignUpDTO, SignUpResponseDTO } from './auth.dto';

import { AuthAccountRequest } from 'express';
import { AccountMapper } from 'src/account/account.mapper';
import { CreateAccountDTO } from 'src/account/dtos/create-account.dto';
import { GetAccountDTO } from 'src/account/dtos/get-account.dto';
import { Role, Status } from 'src/shared/enums/role.enum';

@Injectable()
export class AuthService {
  constructor(
    private accountService: AccountService,
    private jwtService: JwtService,
    private cryptoService: CryptoService,
  ) {}

  async signIn(email: string, password: string): Promise<SignInResponseDTO> {
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

    const authAccountRequest: AuthAccountRequest = {
      id: user?.id ?? null,
      sub: user?.id ?? null,
      name: user?.name ?? null,
      email: user?.email ?? null,
      role: user?.role ?? null,
      status: user?.status ?? null,
      is_active: user?.is_active ?? null,
    };

    return {
      access_token: await this.jwtService.signAsync(authAccountRequest),
    };
  }

  async signUp(signUpDTO: SignUpDTO): Promise<SignUpResponseDTO> {
    if (signUpDTO.password !== signUpDTO.password_confirmation) {
      throw new BadRequestException('Password confirmation does not match');
    }

    const accountExists = await this.accountExists(signUpDTO.email);
    if (accountExists) throw new BadRequestException('Email already exists');

    const salt = this.cryptoService.generateSalt();

    const payload: CreateAccountDTO = {
      name: signUpDTO.name,
      email: signUpDTO.email,
      password: await this.cryptoService.hashPassword(signUpDTO.password, salt),
      salt,
      is_active: true,
      role: Role.CLIENT,
      status: Status.ACTIVE,
    };

    await this.accountService.create(payload);

    return {
      message: 'Account created successfully',
      access_token: await this.jwtService.signAsync(payload),
    };
  }

  async accountExists(email: string): Promise<boolean> {
    const user = await this.accountService.findOne(email);

    return !!user;
  }

  async validateUser(email: string, password: string): Promise<boolean> {
    const user = await this.accountService.findOne(email);

    if (!user) {
      throw new UnauthorizedException();
    }

    const isPasswordValid = this.cryptoService.syncComparePassword(
      password,
      user.salt,
      user.password,
    );

    if (user && !isPasswordValid) {
      return false;
    }

    return true;
  }

  async getProfile(id: string): Promise<GetAccountDTO> {
    const user = await this.accountService.findById(id);

    if (!user) {
      throw new NotFoundException('User not found');
    }

    return AccountMapper.toDTO(user);
  }
}
