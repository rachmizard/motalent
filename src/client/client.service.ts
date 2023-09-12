import { Injectable, Inject, BadRequestException } from '@nestjs/common';
import { FindManyOptions, Repository } from 'typeorm';

import { ClientEntity } from './entities/client.entity';

import { DI_TYPES } from '@src/shared/di.types';
import { CreateClientDTO } from './dtos/create-client-dto';
import { ClientSearchPreferenceEntity } from './entities/client-search-preference.entity';
import { BaseParamsDTO } from '@src/shared/dtos/base-params.dto';
import { PaginationAndFilterService } from '@src/shared/services/pagination.service';

@Injectable()
export class ClientService {
  constructor(
    @Inject(DI_TYPES.CLIENT_REPO)
    private clientRepository: Repository<ClientEntity>,
    @Inject(DI_TYPES.CLIENT_SEARCH_PREFERENCE_REPO)
    private clientSearchPreferenceRepository: Repository<ClientSearchPreferenceEntity>,
    private paginationAndFilterService: PaginationAndFilterService<ClientSearchPreferenceEntity>,
  ) {}

  async create(payload: CreateClientDTO): Promise<ClientEntity> {
    const client = await this.clientRepository.findOneBy({
      account: payload.account,
    });

    if (client && String(payload.account_id) === String(client.id)) {
      throw new BadRequestException('Client already exists');
    }
    const state = this.clientRepository.create(payload);
    return await this.clientRepository.save(state);
  }

  async getClientSearchPreferencesByClientId(
    clientId: number,
    params: BaseParamsDTO,
  ): Promise<{
    results: ClientSearchPreferenceEntity[];
    totalPages: number;
  }> {
    const options: FindManyOptions<ClientSearchPreferenceEntity> = {
      where: {
        client: {
          id: clientId,
        },
      },
    };

    const modifiedOptions =
      this.paginationAndFilterService.applyPaginationAndFilter(options, params);

    const [results, totalPages] = await Promise.allSettled([
      this.clientSearchPreferenceRepository.find(modifiedOptions),
      this.clientSearchPreferenceRepository.count(options),
    ]);

    return {
      results: results.status === 'fulfilled' ? results.value : [],
      totalPages: totalPages.status === 'fulfilled' ? totalPages.value : 0,
    };
  }
}
