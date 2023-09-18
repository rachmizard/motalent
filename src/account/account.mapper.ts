import { AccountEntity } from './account.entity';

import { CreateAccountDTO, GetAccountDTO, UpdateAccountDTO } from './dtos';
export class AccountMapper {
  static toEntity(dto: Partial<CreateAccountDTO | UpdateAccountDTO>) {
    const { name, email, password, salt, is_active, role, status, client } =
      dto;
    const payload = {
      name,
      email,
      password,
      salt,
      is_active,
      role,
      status,
      client,
    };
    return new AccountEntity(payload);
  }

  static toDTO(entity: AccountEntity): GetAccountDTO {
    return new GetAccountDTO({
      id: entity.id,
      name: entity.name,
      email: entity.email,
      role: entity.role,
      status: entity.status,
      is_active: entity.is_active,
      client: entity.client,
      has_complete_registration: entity.has_complete_registration,
    });
  }
}
