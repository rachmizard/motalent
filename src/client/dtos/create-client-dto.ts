import { AccountEntity } from 'src/account/account.entity';

export class CreateClientDTO {
  name?: string;
  bio?: string;
  age?: number;
  account_id?: number;
  account?: AccountEntity;
}
