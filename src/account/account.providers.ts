import { Provider } from '@nestjs/common';
import { DataSource } from 'typeorm';

import { AccountEntity } from './account.entity';
import { DI_TYPES } from 'src/shared/di.types';

export const accountProviders: Provider[] = [
  {
    provide: DI_TYPES.ACCOUNT_REPO,
    inject: [DI_TYPES.DATA_SOURCE],
    useFactory: (connection: DataSource) =>
      connection.getRepository<AccountEntity>(AccountEntity),
  },
];
