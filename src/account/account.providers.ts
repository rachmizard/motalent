import { Provider } from '@nestjs/common';
import { DataSource } from 'typeorm';

import { locator } from 'src/shared/di.types';
import { AccountEntity } from './account.entity';

export const accountProviders: Provider[] = [
  {
    provide: locator.accountRepository,
    inject: [locator.dataSource],
    useFactory: (connection: DataSource) =>
      connection.getRepository<AccountEntity>(AccountEntity),
  },
];
