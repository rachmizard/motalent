import {
  BadRequestException,
  Inject,
  Injectable,
  NotFoundException,
  NotImplementedException,
} from '@nestjs/common';
import { AccountEntity } from '@src/account/account.entity';
import { locator } from '@src/shared/di.types';
import { UseCase } from '@src/shared/usecase';
import { Repository } from 'typeorm';
import { CreateClientJobPostingDTO } from '../dtos/create-client-job-posting.dto';
import { ClientJobPostingEntity } from '../entities/client-job-postings.entity';

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
      relations: ['client'],
    });

    if (!account || !account.client) {
      throw new NotFoundException('Client or Account not found');
    }

    return !!account.has_complete_registration;
  }

  public async execute(body: CreateClientJobPostingDTO): Promise<Result> {
    try {
      const isCompletedRegistration = await this.hasCompleteRegistration(
        body.client_id,
      );

      if (!isCompletedRegistration) {
        throw new BadRequestException(
          'Client is not finished registration process yet',
        );
      }

      throw new NotImplementedException('Not implemented yet');
    } catch (error) {
      if (error instanceof BadRequestException) {
        throw new BadRequestException(error.message);
      }

      if (error instanceof NotFoundException) {
        throw new NotFoundException(error.message);
      }

      throw new Error(error);
    }
  }
}
