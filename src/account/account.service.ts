import { Inject, Injectable } from '@nestjs/common';
import { Repository } from 'typeorm';

import { AccountEntity } from './account.entity';
import { AccountMapper } from './account.mapper';

import { locator } from 'src/shared/di.types';
import { UpdateAccountDTO } from './dtos';
import { CreateAccountDTO } from './dtos/create-account.dto';

import { ClientEntity } from '@src/client/entities/client.entity';

@Injectable()
export class AccountService {
  constructor(
    @Inject(locator.accountRepository)
    private accountRepository: Repository<AccountEntity>,
    @Inject(locator.clientRepository)
    private clientRepository: Repository<ClientEntity>,
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

    const savedClient = await this.clientRepository.save({
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

  async updateRefreshToken(
    id: string,
    refreshToken: string,
  ): Promise<AccountEntity> {
    const result = await this.accountRepository.findOneBy({
      id,
    });

    if (!result) {
      throw new Error('Account not found');
    }

    result.refresh_token = refreshToken;

    return await this.accountRepository.save(result);
  }

  async save(account: AccountEntity): Promise<AccountEntity> {
    return await this.accountRepository.save(account);
  }
}
