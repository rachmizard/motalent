import { Provider } from '@nestjs/common';
import { APP_GUARD } from '@nestjs/core';
import { AuthGuard } from './auth.guard';
import { AuthService } from './auth.service';

export const authProviders: Provider[] = [
  AuthService,
  {
    provide: APP_GUARD,
    useClass: AuthGuard,
  },
];
