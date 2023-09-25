import {
  BadRequestException,
  ForbiddenException,
  Injectable,
  NotFoundException,
  UnauthorizedException,
} from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';

import { AccountService } from 'src/account/account.service';
import { CryptoService } from 'src/shared/crypto/crypto.service';

import {
  RefreshTokenResponseDTO,
  SignInResponseDTO,
  SignUpDTO,
  SignUpResponseDTO,
} from './auth.dto';

import { UpdateAccountDTO } from '@src/account/dtos';
import { AppConfigService } from '@src/shared/app-config/app-config.service';
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
    private configService: AppConfigService,
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

    const tokens = await this.getTokens(authAccountRequest);

    await this.accountService.updateRefreshToken(user.id, tokens.refresh_token);

    return tokens;
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

    const createdAccount = await this.accountService.create(payload);

    const tokens = await this.getTokens({
      email: createdAccount.email,
      id: createdAccount.id,
      name: createdAccount.name,
      role: createdAccount.role,
      is_active: createdAccount.is_active,
      status: createdAccount.status,
      sub: createdAccount.id,
    });

    await this.accountService.updateRefreshToken(
      createdAccount.id,
      tokens.refresh_token,
    );

    return {
      message: 'Account created successfully',
      ...tokens,
    };
  }

  async accountExists(email: string): Promise<boolean> {
    const user = await this.accountService.findOne(email);

    return !!user;
  }

  async validateAccount(email: string, password: string): Promise<boolean> {
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

  async updateProfile(body: UpdateAccountDTO): Promise<GetAccountDTO> {
    const user = await this.accountService.findById(body.id);

    if (!user) {
      throw new NotFoundException('User not found');
    }

    if (body.password !== body.password_confirmation) {
      throw new BadRequestException('Password confirmation does not match');
    }

    let password = user.password;

    if (!!body.password) {
      password = await this.cryptoService.hashPassword(
        body.password,
        user.salt,
      );
    }

    const payload: UpdateAccountDTO = {
      id: body.id,
      name: body.name,
      email: body.email,
      password,
    };

    const updatedAccount = await this.accountService.update(payload);

    return AccountMapper.toDTO(updatedAccount);
  }

  public async getTokens(account: AuthAccountRequest) {
    const [accessToken, refreshToken] = await Promise.all([
      this.jwtService.signAsync(account, {
        secret: this.configService.getJwtSecret(),
        expiresIn: this.configService.getJwtExpirationTime(),
      }),
      this.jwtService.signAsync(account, {
        secret: this.configService.getJwtRefreshSecret(),
        expiresIn: this.configService.getJwtRefreshExpirationTime(),
      }),
    ]);

    return {
      access_token: accessToken,
      refresh_token: refreshToken,
    };
  }

  public async refreshTokens(
    accountId: string,
    refreshToken: string,
  ): Promise<RefreshTokenResponseDTO> {
    const account = await this.accountService.findById(accountId);

    if (!account) {
      throw new NotFoundException('Account not found');
    }

    if (!account.refresh_token) {
      throw new ForbiddenException('Refresh token not found');
    }

    if (account.refresh_token !== refreshToken) {
      throw new ForbiddenException('Refresh token does not match');
    }

    const decoded = await this.jwtService.verifyAsync(refreshToken, {
      secret: this.configService.getJwtRefreshSecret(),
    });

    const tokens = await this.getTokens({
      email: decoded.email,
      id: decoded.id,
      name: decoded.name,
      role: decoded.role,
      is_active: decoded.is_active,
      status: decoded.status,
      sub: decoded.id,
    });

    await this.accountService.updateRefreshToken(
      accountId,
      tokens.refresh_token,
    );

    return tokens;
  }
}
