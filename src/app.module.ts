import { CacheInterceptor, CacheModule } from '@nestjs/cache-manager';
import { Module } from '@nestjs/common';
import { APP_GUARD, APP_INTERCEPTOR, RouterModule } from '@nestjs/core';

import { AccountModule } from './account/account.module';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { AuthModule } from './auth/auth.module';
import { JwtAuthGuard } from './auth/guards/jwt-auth.guard';
import { ClientModule } from './client/client.module';
import { GeneralModule } from './general/general.module';
import { LocationModule } from './general/location.module';
import { AppConfigModule } from './shared/app-config/app-config.module';
import { RoleGuard } from './shared/guards/role/role.guard';

@Module({
  imports: [
    CacheModule.register({
      isGlobal: true,
      max: 1000,
      ttl: 60,
    }),
    AuthModule,
    AppConfigModule,
    ClientModule,
    AccountModule,
    GeneralModule,
    LocationModule,
    RouterModule.register([
      {
        path: 'auth',
        module: AuthModule,
      },
      {
        path: 'client',
        module: ClientModule,
      },
      {
        path: 'account',
        module: AccountModule,
      },
      {
        path: 'general',
        module: GeneralModule,
        children: [
          {
            path: 'location',
            module: LocationModule,
          },
        ],
      },
    ]),
  ],
  controllers: [AppController],
  providers: [
    AppService,
    {
      provide: APP_GUARD,
      useClass: JwtAuthGuard,
    },
    {
      provide: APP_GUARD,
      useClass: RoleGuard,
    },
    {
      provide: APP_INTERCEPTOR,
      useClass: CacheInterceptor,
    },
  ],
})
export class AppModule {}
