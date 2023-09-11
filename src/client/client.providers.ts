import { Provider } from '@nestjs/common';
import { DataSource } from 'typeorm';

import { ClientEntity } from './client.entity';
import { DI_TYPES } from 'src/shared/di.types';

export const clientProviders: Provider[] = [
  {
    provide: DI_TYPES.CLIENT_REPO,
    inject: [DI_TYPES.DATA_SOURCE],
    useFactory: (dataSource: DataSource) =>
      dataSource.getRepository<ClientEntity>(ClientEntity),
  },
];
