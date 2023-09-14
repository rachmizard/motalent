import { Module } from '@nestjs/common';
import { DatabaseModule } from 'src/database/database.module';
import { clientProviders } from './client.providers';
import { GetClientSearchPreferencesController } from './controllers/get-client-search-preferences.controller';
import { UpdateClientRegistrationController } from './controllers/update-client-registration.controller';

@Module({
  imports: [DatabaseModule],
  providers: clientProviders,
  exports: clientProviders,
  controllers: [
    GetClientSearchPreferencesController,
    UpdateClientRegistrationController,
  ],
})
export class ClientModule {}
