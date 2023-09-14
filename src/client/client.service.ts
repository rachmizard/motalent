import {
  BadRequestException,
  Inject,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { AuthAccountRequest } from 'express';
import { FindManyOptions, Repository } from 'typeorm';

import { ClientEntity } from './entities/client.entity';

import { DI_TYPES } from '@src/shared/di.types';
import { BaseParamsDTO } from '@src/shared/dtos/base-params.dto';
import { PaginationAndFilterService } from '@src/shared/services/pagination.service';
import { CreateClientDTO } from './dtos/create-client-dto';
import { UpdateClientRegistrationDTO } from './dtos/update-client-registration.dto';
import { ClientSearchPreferenceEntity } from './entities/client-search-preference.entity';

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
    const client = await this.clientRepository.findOne({
      where: {
        account: {
          id: payload.account_id?.toString(),
        },
      },
      relations: {
        account: true,
      },
      relationLoadStrategy: 'join',
    });

    if (client && String(payload.account_id) === String(client.id)) {
      throw new BadRequestException('Client already exists');
    }
    const state = this.clientRepository.create(payload);
    return await this.clientRepository.save(state);
  }

  async getClientSearchPreferencesByClientId(
    clientId: number,
    account: AuthAccountRequest,
    params: BaseParamsDTO,
  ): Promise<{
    results: ClientSearchPreferenceEntity[];
    totalPages: number;
  }> {
    const clientAccount = await this.clientRepository.findOne({
      where: {
        account: {
          id: account.id.toString(),
        },
      },
    });

    if (clientAccount.id !== clientId) {
      throw new BadRequestException('Client not found');
    }

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

  async updateClientRegistration(
    clientId: number,
    body: UpdateClientRegistrationDTO,
  ) {
    const existClient = await this.clientRepository.findOne({
      where: {
        id: clientId,
      },
    });

    if (!existClient) {
      throw new NotFoundException('Client not found');
    }

    const updatedClient = this.clientRepository.merge(existClient, {
      ...body.profile,
      ...body.location,
    });
    await this.clientRepository.save(updatedClient);

    const mappedSearchPreferences = body.search_preferences.map((v) => ({
      client: updatedClient,
      ...v,
    }));

    await this.clientSearchPreferenceRepository.save(mappedSearchPreferences);
  }
}
