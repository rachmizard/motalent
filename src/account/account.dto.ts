export interface CreateAccountDTO {
  id?: string;
  name?: string;
  email?: string;
  role?: string;
  password?: string;
  salt?: string;
  status?: string;
  is_active?: boolean;
}

export interface AccountDTO {
  id?: string;
  name?: string;
  email?: string;
  role?: string;
  status?: string;
  is_active?: boolean;
}

export interface UpdateAccountDTO extends Partial<CreateAccountDTO> {}
