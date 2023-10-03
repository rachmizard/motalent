import {
  BadRequestException,
  Inject,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { DataSource, Repository } from 'typeorm';

import { AccountEntity } from '@src/account/account.entity';
import { locator } from '@src/shared/di.types';
import { UseCase } from '@src/shared/usecase';
import { CreateClientJobPostingDTO } from '../dtos/create-client-job-posting.dto';
import { ClientJobPostingEntity } from '../entities/client-job-postings.entity';
import { ClientEntity } from '../entities/client.entity';

type Result = void;

@Injectable()
export class CreateClientJobPostingUseCase
  implements UseCase<Result, CreateClientJobPostingDTO>
{
  constructor(
    @Inject(locator.clientJobPostingRepository)
    private readonly clientJobPostingRepository: Repository<ClientJobPostingEntity>,
    @Inject(locator.accountRepository)
    private readonly accountRepository: Repository<AccountEntity>,
    @Inject(locator.clientRepository)
    private readonly clientRepository: Repository<ClientEntity>,
    @Inject(locator.dataSource)
    private readonly dataSource: DataSource,
  ) {}

  protected async hasCompleteRegistration(
    clientId: string | number,
  ): Promise<boolean> {
    const account = await this.accountRepository.findOne({
      where: {
        client: {
          id: Number(clientId),
        },
      },
      relations: {
        client: true,
      },
    });

    if (account.client?.id !== Number(clientId)) {
      throw new NotFoundException('Client not found');
    }

    if (!account || !account.client) {
      throw new NotFoundException('Client or Account not found');
    }

    return account.has_complete_registration;
  }

  public async create(
    body: CreateClientJobPostingDTO,
  ): Promise<ClientJobPostingEntity> {
    const clientJobPosting = this.clientJobPostingRepository.create();
    const client = await this.clientRepository.findOne({
      where: {
        id: parseInt(body.client_id),
      },
    });

    const transformed: ClientJobPostingEntity = {
      ...clientJobPosting,
      ...body,
      client,
    };

    return this.clientJobPostingRepository.create(transformed);
  }

  public async save(
    props: ClientJobPostingEntity,
  ): Promise<ClientJobPostingEntity> {
    return this.dataSource.transaction(async (manager) => {
      return await manager.save(props);
    });
  }

  public async execute(body: CreateClientJobPostingDTO): Promise<Result> {
    const isCompletedRegistration = await this.hasCompleteRegistration(
      body.client_id,
    );

    if (!isCompletedRegistration) {
      throw new BadRequestException(
        'Client is not finished registration process yet',
      );
    }

    const createdJobPosting = await this.create(body);
    await this.save(createdJobPosting);
  }
}
