import { Module } from '@nestjs/common';

import { AppController } from './app.controller';
import { AppService } from './app.service';
import { AuthModule } from './auth/auth.module';
import { AccountModule } from './account/account.module';
import { CryptoModule } from './shared/crypto/crypto.module';

@Module({
  imports: [AuthModule, AccountModule, CryptoModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
