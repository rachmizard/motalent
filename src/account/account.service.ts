import { Inject, Injectable } from '@nestjs/common';
import { Repository } from 'typeorm';

import { AccountEntity } from './account.entity';
import { AccountMapper } from './account.mapper';

import { DI_TYPES } from 'src/shared/di.types';
import { CreateAccountDTO } from './dtos/create-account.dto';

@Injectable()
export class AccountService {
  constructor(
    @Inject(DI_TYPES.ACCOUNT_REPO)
    private accountRepository: Repository<AccountEntity>,
  ) {}

  async findOne(email: string): Promise<AccountEntity | undefined> {
    const result = await this.accountRepository.findOneBy({
      email,
    });

    return result;
  }

  async findById(id: string): Promise<AccountEntity | undefined> {
    const result = await this.accountRepository.findOneBy({
      id,
    });

    return result;
  }

  async create(account: CreateAccountDTO): Promise<AccountEntity> {
    const entity = AccountMapper.toEntity(account);
    const result = await this.accountRepository.save(entity);

    return result;
  }
}
