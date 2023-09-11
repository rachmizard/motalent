import { Role } from 'src/shared/enums/role.enum';

export interface CreateAccountDTO {
  id?: string;
  name?: string;
  email?: string;
  role?: Role;
  password?: string;
  salt?: string;
  status?: string;
  is_active?: boolean;
}

export interface AccountDTO {
  id?: string;
  name?: string;
  email?: string;
  role?: Role;
  status?: string;
  is_active?: boolean;
}

export interface UpdateAccountDTO extends Partial<CreateAccountDTO> {}
