import { Provider } from '@nestjs/common';

import { locator } from '../di.types';
import { AppConfigService } from './app-config.service';

export const appConfigProviders: Provider[] = [
  {
    provide: locator.appConfigService,
    inject: [AppConfigService],
    useFactory: async (configService: AppConfigService) => {
      return configService;
    },
  },
];
