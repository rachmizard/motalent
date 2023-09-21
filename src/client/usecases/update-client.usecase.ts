import { Inject, Injectable } from '@nestjs/common';
import { Repository } from 'typeorm';

import { locator } from '@src/shared/di.types';
import { GenderEnum } from '@src/shared/enums/gender.enum';
import { UseCase } from '@src/shared/usecase';

import { UpdateClientDTO } from '../dtos/update-client.dto';
import { ClientEntity } from '../entities/client.entity';

interface UpdateClientArguments {
  clientId: string;
  body: UpdateClientDTO;
}

@Injectable()
export class UpdateClientUseCase extends UseCase<void, UpdateClientArguments> {
  constructor(
    @Inject(locator.clientRepository)
    private readonly clientRepository: Repository<ClientEntity>,
  ) {
    super();
  }

  public async execute({
    body,
    clientId,
  }: UpdateClientArguments): Promise<void> {
    const client = await this.clientRepository.findOne({
      where: {
        id: parseInt(clientId),
      },
    });

    if (!client) {
      throw new Error('Client not found');
    }

    const transformedPayload: Partial<ClientEntity> = {
      ...body,
      gender: GenderEnum[body.gender],
    };

    await this.clientRepository.update(clientId, transformedPayload);
  }
}
