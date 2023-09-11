export class GetAccountDTO {
  constructor(partial: Partial<GetAccountDTO>) {
    Object.assign(this, partial);
  }

  id: string;
  name: string;
  email: string;
  role: string;
  status: string;
  is_active: boolean;
  created_at: Date;
  updated_at: Date;
}
