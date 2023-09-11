import { Injectable, Inject, BadRequestException } from '@nestjs/common';
import { Repository } from 'typeorm';

import { ClientEntity } from './client.entity';

import { DI_TYPES } from 'src/shared/di.types';
import { CreateClientDTO } from './dtos/create-client-dto';

@Injectable()
export class ClientService {
  constructor(
    @Inject(DI_TYPES.CLIENT_REPO)
    private clientRepository: Repository<ClientEntity>,
  ) {}

  async createClient(payload: CreateClientDTO): Promise<ClientEntity> {
    const client = await this.clientRepository.findOneBy({
      account: payload.account,
    });

    if (client && String(payload.account_id) === String(client.id)) {
      throw new BadRequestException('Client already exists');
    }
    const state = this.clientRepository.create(payload);
    return await this.clientRepository.save(state);
  }
}
