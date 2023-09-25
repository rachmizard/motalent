import { Module } from '@nestjs/common';
import { JwtModule } from '@nestjs/jwt';
import { PassportModule } from '@nestjs/passport';

import { AppConfigModule } from '@src/shared/app-config/app-config.module';
import { AppConfigService } from '@src/shared/app-config/app-config.service';
import { AccountModule } from 'src/account/account.module';
import { CryptoModule } from 'src/shared/crypto/crypto.module';
import { AuthController } from './auth.controller';
import { AuthService } from './auth.service';
import { JwtStrategy } from './strategies/jwt.strategy';
import { LocalStrategy } from './strategies/local.strategy';
import { RefreshTokenStrategy } from './strategies/refresh-token.strategy';

@Module({
  imports: [
    AccountModule,
    CryptoModule,
    PassportModule,
    AppConfigModule,
    JwtModule.registerAsync({
      imports: [AppConfigModule],
      inject: [AppConfigService],
      useFactory: (appConfigService: AppConfigService) => ({
        secret: appConfigService.getJwtSecret(),
        signOptions: {
          expiresIn: appConfigService.getJwtExpirationTime(),
        },
      }),
    }),
  ],
  providers: [AuthService, LocalStrategy, JwtStrategy, RefreshTokenStrategy],
  exports: [AuthService],
  controllers: [AuthController],
})
export class AuthModule {}
