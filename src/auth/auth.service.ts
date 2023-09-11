import {
  Injectable,
  NotFoundException,
  UnauthorizedException,
} from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';

import { AccountService } from 'src/account/account.service';

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
}
