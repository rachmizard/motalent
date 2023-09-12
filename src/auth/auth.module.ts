import { Module } from '@nestjs/common';
import { JwtModule } from '@nestjs/jwt';

import { AccountModule } from 'src/account/account.module';
import { CryptoModule } from 'src/shared/crypto/crypto.module';
import { jwtConstants } from './auth.constant';
import { AuthController } from './auth.controller';
import { AuthService } from './auth.service';

@Module({
  imports: [
    AccountModule,
    CryptoModule,
    JwtModule.register({
      global: true,
      secret: jwtConstants.secret,
      signOptions: {
        expiresIn: '1d',
      },
    }),
  ],
  providers: [AuthService],
  exports: [AuthService],
  controllers: [AuthController],
})
export class AuthModule {}
