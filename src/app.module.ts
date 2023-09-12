import { Module } from '@nestjs/common';

import { AppController } from './app.controller';
import { AppService } from './app.service';
import { AuthModule } from './auth/auth.module';
import { AccountModule } from './account/account.module';
import { CryptoModule } from './shared/crypto/crypto.module';
import { DatabaseModule } from './database/database.module';
import { AppConfigModule } from './shared/app-config/app-config.module';
import { ClientModule } from './client/client.module';
import { APP_GUARD } from '@nestjs/core';
import { AuthGuard } from './auth/auth.guard';
import { RoleGuard } from './shared/guards/role/role.guard';

@Module({
  imports: [
    AuthModule,
    AccountModule,
    CryptoModule,
    DatabaseModule,
    AppConfigModule,
    ClientModule,
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
