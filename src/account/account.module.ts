import { Module } from '@nestjs/common';

import { ClientModule } from 'src/client/client.module';
import { DatabaseModule } from 'src/database/database.module';
import { accountProviders } from './account.providers';
import { AccountService } from './account.service';

@Module({
  imports: [DatabaseModule, ClientModule],
  providers: [AccountService, ...accountProviders],
  exports: [AccountService, ...accountProviders],
})
export class AccountModule {}
