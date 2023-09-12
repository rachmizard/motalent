import { Inject, Injectable } from '@nestjs/common';
import { Repository } from 'typeorm';

import { AccountEntity } from './account.entity';
import { AccountMapper } from './account.mapper';

import { DI_TYPES } from 'src/shared/di.types';
import { CreateAccountDTO } from './dtos/create-account.dto';
import { UpdateAccountDTO } from './dtos';

import { ClientService } from 'src/client/client.service';

@Injectable()
export class AccountService {
  constructor(
    @Inject(DI_TYPES.ACCOUNT_REPO)
    private accountRepository: Repository<AccountEntity>,
    private clientService: ClientService,
  ) {}

  async findOne(email: string): Promise<AccountEntity | undefined> {
    const result = await this.accountRepository.findOne({
      where: {
        email,
      },
    });

    return result;
  }

  async findById(id: string): Promise<AccountEntity | undefined> {
    const result = await this.accountRepository.findOne({
      where: {
        id,
      },
    });

    return result;
  }

  async create(dto: CreateAccountDTO): Promise<AccountEntity> {
    const account = this.accountRepository.create(dto);
    const savedAccount = await this.save(account);

    const savedClient = await this.clientService.create({
      account: savedAccount,
      name: dto.name,
    });

    account.client = savedClient;

    return await this.save(account);
  }

  async update(account: UpdateAccountDTO): Promise<AccountEntity> {
    const result = await this.accountRepository.findOneBy({
      id: account?.id,
    });

    if (!result) {
      throw new Error('Account not found');
    }

    const entity = AccountMapper.toEntity(account);
    await this.accountRepository.update(result.id, entity);

    return entity;
  }

  async save(account: AccountEntity): Promise<AccountEntity> {
    return await this.accountRepository.save(account);
  }
}
