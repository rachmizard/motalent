import { Inject, Injectable, NotFoundException } from '@nestjs/common';
import { Repository } from 'typeorm';

import { DI_TYPES } from '@src/shared/di.types';
import { UseCase } from '@src/shared/usecase';
import { UpdateClientRegistrationDTO } from '../dtos/update-client-registration.dto';
import { ClientSearchPreferenceEntity } from '../entities/client-search-preference.entity';
import { ClientEntity } from '../entities/client.entity';

interface UseCaseArgs {
  clientId: number;
  body: UpdateClientRegistrationDTO;
}

type Result = void;

@Injectable()
export class UpdateClientRegistrationUseCase extends UseCase<Result> {
  constructor(
    @Inject(DI_TYPES.CLIENT_REPO)
    private readonly clientRepository: Repository<ClientEntity>,
    @Inject(DI_TYPES.CLIENT_SEARCH_PREFERENCE_REPO)
    private readonly clientSearchPreferenceRepository: Repository<ClientSearchPreferenceEntity>,
  ) {
    super();
  }

  async validateClient(clientId: number): Promise<ClientEntity> {
    const existClient = await this.clientRepository.findOne({
      where: {
        id: clientId,
      },
    });

    if (!existClient) {
      throw new NotFoundException('Client not found');
    }

    return existClient;
  }

  async execute({ clientId, body }: UseCaseArgs): Promise<Result> {
    const existClient = await this.validateClient(clientId);

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
