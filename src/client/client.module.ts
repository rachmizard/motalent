import { Module } from '@nestjs/common';
import { DatabaseModule } from 'src/database/database.module';
import { clientProviders } from './client.providers';
import { CreateClientJobPostingControllerController } from './controllers/create-client-job-posting.controller';
import { GetClientSearchPreferencesController } from './controllers/get-client-search-preferences.controller';
import { UpdateClientRegistrationController } from './controllers/update-client-registration.controller';
import { UpdateClientController } from './controllers/update-client.controller';

@Module({
  imports: [DatabaseModule],
  providers: clientProviders,
  exports: clientProviders,
  controllers: [
    GetClientSearchPreferencesController,
    UpdateClientRegistrationController,
    UpdateClientController,
    CreateClientJobPostingControllerController,
  ],
})
export class ClientModule {}
