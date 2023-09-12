import { Module } from '@nestjs/common';

import { HttpModule } from '@nestjs/axios';

import { AppConfigModule } from '@src/shared/app-config/app-config.module';
import { AppConfigService } from '@src/shared/app-config/app-config.service';

import { LocationController } from './location.controller';
import { LocationService } from './location.service';

@Module({
  imports: [
    HttpModule.registerAsync({
      imports: [AppConfigModule],
      inject: [AppConfigService],
      useFactory: async (appConfigService: AppConfigService) => ({
        timeout: appConfigService.getHttpConfig().timeout,
        maxRedirects: appConfigService.getHttpConfig().maxRedirects,
        baseURL: appConfigService.getLocationConfig().apiUrl,
        params: {
          api_key: appConfigService.getLocationConfig().apiKey,
        },
      }),
    }),
  ],
  controllers: [LocationController],
  providers: [LocationService],
})
export class LocationModule {}
