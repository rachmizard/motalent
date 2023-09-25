import { Injectable } from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';
import { Request } from 'express';
import { ExtractJwt, Strategy } from 'passport-jwt';

import appConfigConfiguration from '@src/shared/app-config/app-config.configuration';

@Injectable()
export class RefreshTokenStrategy extends PassportStrategy(
  Strategy,
  'jwt-refresh',
) {
  constructor() {
    super({
      jwtFromRequest: ExtractJwt.fromBodyField('refresh_token'),
      secretOrKey: appConfigConfiguration().jwtRefreshSecret,
      passReqToCallback: true,
    });
  }

  async validate(req: Request, payload: any): Promise<any> {
    const refreshToken = req.body?.refresh_token || null;
    return { ...payload, refreshToken };
  }
}
