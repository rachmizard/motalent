import { Module } from '@nestjs/common';

import { AppController } from './app.controller';
import { AppService } from './app.service';
import { AuthModule } from './auth/auth.module';
import { AccountModule } from './account/account.module';
import { AppConfigModule } from './shared/app-config/app-config.module';
import { ClientModule } from './client/client.module';
import { APP_GUARD, RouterModule } from '@nestjs/core';
import { AuthGuard } from './auth/auth.guard';
import { RoleGuard } from './shared/guards/role/role.guard';
import { GeneralModule } from './general/general.module';
import { LocationModule } from './general/location.module';

@Module({
  imports: [
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
      useClass: AuthGuard,
    },
    {
      provide: APP_GUARD,
      useClass: RoleGuard,
    },
  ],
})
export class AppModule {}
