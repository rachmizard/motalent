import { JwtService } from '@nestjs/jwt';
import { Reflector } from '@nestjs/core';

import { AuthGuard } from './auth.guard';

describe('AuthGuard', () => {
  it('should be defined', () => {
    expect(new AuthGuard(new JwtService(), new Reflector())).toBeDefined();
  });
});
