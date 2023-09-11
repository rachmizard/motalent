import { Module } from '@nestjs/common';
import { AppConfigService } from './app-config.service';
import { ConfigModule } from '@nestjs/config';

import appConfigConfiguration from './app-config.configuration';

@Module({
  imports: [
    ConfigModule.forRoot({
      load: [appConfigConfiguration],
      envFilePath: ['.env.local', '.env.development', '.env.production'],
    }),
  ],
  providers: [AppConfigService],
  exports: [AppConfigService],
})
export class AppConfigModule {}
