import { CreateAccountDTO, UpdateAccountDTO } from './account.dto';
import { AccountEntity } from './account.entity';

export class AccountMapper {
  static toEntity(dto: Partial<CreateAccountDTO>) {
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

  static toDTO(entity: AccountEntity) {
    const { id, name, email, role, status, is_active } = entity;

    const dto: Partial<CreateAccountDTO | UpdateAccountDTO> = {
      id,
      name,
      email,
      role,
      status,
      is_active,
    };

    return dto;
  }
}
