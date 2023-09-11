import { Module } from '@nestjs/common';

import { AppController } from './app.controller';
import { AppService } from './app.service';
import { AuthModule } from './auth/auth.module';
import { AccountModule } from './account/account.module';
import { CryptoModule } from './shared/crypto/crypto.module';
import { DatabaseModule } from './database/database.module';
import { AppConfigModule } from './shared/app-config/app-config.module';

@Module({
  imports: [
    AuthModule,
    AccountModule,
    CryptoModule,
    DatabaseModule,
    AppConfigModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
