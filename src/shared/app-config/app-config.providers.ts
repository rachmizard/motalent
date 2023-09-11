import { Provider } from '@nestjs/common';

import { DI_TYPES } from '../di.types';
import { AppConfigService } from './app-config.service';

export const appConfigProviders: Provider[] = [
  {
    provide: DI_TYPES.APP_CONFIG,
    inject: [AppConfigService],
    useFactory: async (configService: AppConfigService) => {
      return configService;
    },
  },
];
