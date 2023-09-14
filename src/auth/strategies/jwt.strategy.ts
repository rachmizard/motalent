import { Injectable } from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';
import { ExtractJwt, Strategy } from 'passport-jwt';

import appConfigConfiguration from '@src/shared/app-config/app-config.configuration';

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {
  constructor() {
    super({
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      ignoreExpiration: false,
      secretOrKey: appConfigConfiguration().jwtSecret,
    });
  }

  async validate(payload: any): Promise<any> {
    return {
      id: payload.sub,
      email: payload.email,
      role: payload.role,
      ...payload,
    };
  }
}
