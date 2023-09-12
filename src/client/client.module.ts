import { Module } from '@nestjs/common';
import { ClientService } from './client.service';
import { clientProviders } from './client.providers';
import { DatabaseModule } from 'src/database/database.module';
import { GetClientSearchPreferencesController } from './controllers/get-client-search-preferences.controller';

@Module({
  imports: [DatabaseModule],
  providers: [ClientService, ...clientProviders],
  exports: [ClientService, ...clientProviders],
  controllers: [GetClientSearchPreferencesController],
})
export class ClientModule {}
