import { Provider } from '@nestjs/common';
import { DataSource } from 'typeorm';

import { AccountEntity } from '@src/account/account.entity';
import { PaginationAndFilterService } from '@src/shared/services/pagination.service';
import { locator } from 'src/shared/di.types';
import { ClientSearchPreferenceEntity } from './entities/client-search-preference.entity';
import { ClientEntity } from './entities/client.entity';
import { GetClientSearchPreferencesByClientIdUseCase } from './usecases/get-client-search-preferences-by-client-id.usecase';
import { UpdateClientRegistrationUseCase } from './usecases/update-client-registration.usecase';

export const clientProviders: Provider[] = [
  // Services
  PaginationAndFilterService,

  // Repositories
  {
    provide: locator.clientRepository,
    inject: [locator.dataSource],
    useFactory: (dataSource: DataSource) =>
      dataSource.getRepository<ClientEntity>(ClientEntity),
  },
  {
    provide: locator.clientSearchPreferenceRepository,
    inject: [locator.dataSource],
    useFactory: (dataSource: DataSource) =>
      dataSource.getRepository<ClientSearchPreferenceEntity>(
        ClientSearchPreferenceEntity,
      ),
  },
  {
    provide: locator.accountRepository,
    inject: [locator.dataSource],
    useFactory: (dataSource: DataSource) =>
      dataSource.getRepository<AccountEntity>(AccountEntity),
  },

  // Use cases
  GetClientSearchPreferencesByClientIdUseCase,
  UpdateClientRegistrationUseCase,
];
