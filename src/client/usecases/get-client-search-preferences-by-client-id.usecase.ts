import { BadRequestException, Inject, Injectable } from '@nestjs/common';
import { AuthAccountRequest } from 'express';
import { FindManyOptions, Repository } from 'typeorm';

import { DI_TYPES } from '@src/shared/di.types';
import { BaseParamsDTO } from '@src/shared/dtos/base-params.dto';
import { PaginationAndFilterService } from '@src/shared/services/pagination.service';
import { UseCase } from '@src/shared/usecase';
import { ClientSearchPreferenceEntity } from '../entities/client-search-preference.entity';
import { ClientEntity } from '../entities/client.entity';

interface UseCaseArgs {
  auth: AuthAccountRequest;
  clientId: number;
  params: BaseParamsDTO;
  body: any;
}

interface Result {
  results: ClientSearchPreferenceEntity[];
  totalPages: number;
}

@Injectable()
export class GetClientSearchPreferencesByClientIdUseCase extends UseCase<Result> {
  constructor(
    @Inject(DI_TYPES.CLIENT_REPO)
    private clientRepository: Repository<ClientEntity>,
    @Inject(DI_TYPES.CLIENT_SEARCH_PREFERENCE_REPO)
    private clientSearchPreferenceRepository: Repository<ClientSearchPreferenceEntity>,
    private paginationAndFilterService: PaginationAndFilterService<ClientSearchPreferenceEntity>,
  ) {
    super();
  }

  async execute({ params, clientId, auth }: UseCaseArgs): Promise<Result> {
    await this.validateClient(clientId, auth);

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

  async validateClient(clientId: number, account: AuthAccountRequest) {
    const clientAccount = await this.clientRepository.findOne({
      where: {
        account: {
          id: account.id.toString(),
        },
      },
    });

    if (clientAccount.id !== clientId) {
      throw new BadRequestException('Client not match with account');
    }

    return clientAccount;
  }
}
