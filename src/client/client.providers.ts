import { Provider } from '@nestjs/common';
import { DataSource } from 'typeorm';

import { PaginationAndFilterService } from '@src/shared/services/pagination.service';
import { DI_TYPES } from 'src/shared/di.types';
import { ClientService } from './client.service';
import { ClientSearchPreferenceEntity } from './entities/client-search-preference.entity';
import { ClientEntity } from './entities/client.entity';

export const clientProviders: Provider[] = [
  ClientService,
  {
    provide: DI_TYPES.CLIENT_REPO,
    inject: [DI_TYPES.DATA_SOURCE],
    useFactory: (dataSource: DataSource) =>
      dataSource.getRepository<ClientEntity>(ClientEntity),
  },
  {
    provide: DI_TYPES.CLIENT_SEARCH_PREFERENCE_REPO,
    inject: [DI_TYPES.DATA_SOURCE],
    useFactory: (dataSource: DataSource) =>
      dataSource.getRepository<ClientSearchPreferenceEntity>(
        ClientSearchPreferenceEntity,
      ),
  },
  PaginationAndFilterService,
];
