import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';

import appConfigConfiguration from './app-config.configuration';

import { appConfigProviders } from './app-config.providers';
import { AppConfigService } from './app-config.service';

@Module({
  imports: [
    ConfigModule.forRoot({
      load: [appConfigConfiguration],
      envFilePath: ['.env.local', '.env.development', '.env.production'],
    }),
  ],
  providers: [AppConfigService, ...appConfigProviders],
  exports: [AppConfigService, ...appConfigProviders],
})
export class AppConfigModule {}
