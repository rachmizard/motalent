import { Provider } from '@nestjs/common';
import { DataSource } from 'typeorm';

import { PaginationAndFilterService } from '@src/shared/services/pagination.service';
import { DI_TYPES } from 'src/shared/di.types';
import { ClientSearchPreferenceEntity } from './entities/client-search-preference.entity';
import { ClientEntity } from './entities/client.entity';
import { GetClientSearchPreferencesByClientIdUseCase } from './usecases/get-client-search-preferences-by-client-id.usecase';
import { UpdateClientRegistrationUseCase } from './usecases/update-client-registration.usecase';

export const clientProviders: Provider[] = [
  // Services
  PaginationAndFilterService,

  // Repositories
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

  // Use cases
  GetClientSearchPreferencesByClientIdUseCase,
  UpdateClientRegistrationUseCase,
];
