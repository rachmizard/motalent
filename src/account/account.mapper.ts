import { AccountEntity } from './account.entity';

import { CreateAccountDTO, GetAccountDTO, UpdateAccountDTO } from './dtos';
export class AccountMapper {
  static toEntity(dto: Partial<CreateAccountDTO | UpdateAccountDTO>) {
    const { name, email, password, salt, is_active, role, status } = dto;
    const payload = {
      name,
      email,
      password,
      salt,
      is_active,
      role,
      status,
    };
    return new AccountEntity(payload);
  }

  static toDTO(entity: AccountEntity): GetAccountDTO {
    const { name, email, role, status, is_active, created_at, id, updated_at } =
      entity;

    return new GetAccountDTO({
      id,
      name,
      email,
      role,
      status,
      is_active,
      created_at,
      updated_at,
    });
  }
}
