import { Inject, Injectable } from '@nestjs/common';
import { Repository } from 'typeorm';

import { locator } from '@src/shared/di.types';
import { GenderEnum } from '@src/shared/enums/gender.enum';
import { UseCase } from '@src/shared/usecase';

import { UpdateClientDTO } from '../dtos/update-client.dto';
import { ClientEntity } from '../entities/client.entity';

interface Arguments {
  clientId: string;
  body: UpdateClientDTO;
}

@Injectable()
export class UpdateClientUseCase extends UseCase<
  Partial<ClientEntity>,
  Arguments
> {
  constructor(
    @Inject(locator.clientRepository)
    private readonly clientRepository: Repository<ClientEntity>,
  ) {
    super();
  }

  private toEntity(data: Partial<UpdateClientDTO>): Partial<ClientEntity> {
    return {
      ...data,
      gender: GenderEnum[data.gender],
    };
  }

  public async execute({
    body,
    clientId,
  }: Arguments): Promise<Partial<ClientEntity>> {
    const client = await this.clientRepository.findOne({
      where: {
        id: parseInt(clientId),
      },
    });

    if (!client) {
      throw new Error('Client not found');
    }

    const savedClient = await this.clientRepository.save(
      this.toEntity({
        ...client,
        ...body,
      }),
    );

    return savedClient;
  }
}
