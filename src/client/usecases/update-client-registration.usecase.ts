import { Inject, Injectable, NotFoundException } from '@nestjs/common';
import { DataSource, Repository } from 'typeorm';

import { AccountEntity } from '@src/account/account.entity';
import { locator } from '@src/shared/di.types';
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
export class UpdateClientRegistrationUseCase extends UseCase<
  Result,
  UseCaseArgs
> {
  constructor(
    @Inject(locator.clientRepository)
    private readonly clientRepository: Repository<ClientEntity>,
    @Inject(locator.clientSearchPreferenceRepository)
    private readonly clientSearchPreferenceRepository: Repository<ClientSearchPreferenceEntity>,
    @Inject(locator.accountRepository)
    private readonly accountRepository: Repository<AccountEntity>,
    @Inject(locator.dataSource)
    private readonly dataSource: DataSource,
  ) {
    super();
  }

  async validateClient(clientId: number): Promise<ClientEntity> {
    const existClient = await this.clientRepository.findOne({
      where: {
        id: clientId,
      },
      relations: {
        account: true,
      },
    });

    if (!existClient) {
      throw new NotFoundException('Client not found');
    }

    return existClient;
  }

  async updateClient(client: ClientEntity, body: UpdateClientRegistrationDTO) {
    const updatedClient = this.clientRepository.merge(client, {
      ...body.profile,
      ...body.location,
    });
    return updatedClient;
  }

  async createSearchPreferences(
    client: ClientEntity,
    body: UpdateClientRegistrationDTO,
  ) {
    const mappedSearchPreferences = body.search_preferences.map((v) => ({
      client,
      ...v,
    }));

    const updatedSearchPreferences =
      this.clientSearchPreferenceRepository.create(mappedSearchPreferences);
    return updatedSearchPreferences;
  }

  async updateAccount(client: ClientEntity) {
    const updatedAccount = this.accountRepository.create({
      id: client.account.id,
      has_complete_registration: true,
    });
    return updatedAccount;
  }

  async execute({ clientId, body }: UseCaseArgs): Promise<Result> {
    await this.dataSource.transaction(async (manager) => {
      const existClient = await this.validateClient(clientId);
      const updatedClient = await this.updateClient(existClient, body);

      await manager.save(updatedClient);

      const createdSearchPreferences = await this.createSearchPreferences(
        updatedClient,
        body,
      );
      await manager.save(createdSearchPreferences);

      const updatedAccount = await this.updateAccount(updatedClient);
      await manager.save(updatedAccount);
    });
  }
}
