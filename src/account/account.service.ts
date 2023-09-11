import { Injectable } from '@nestjs/common';
import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';

import { AccountEntity } from './account.entity';

@Injectable()
export class AccountService {
  constructor(
    @InjectRepository(AccountEntity)
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

  async create(account: AccountEntity): Promise<AccountEntity> {
    const result = await this.accountRepository.save(account);

    return result;
  }
}
