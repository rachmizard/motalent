import { Module } from '@nestjs/common';
import { clientProviders } from './client.providers';
import { DatabaseModule } from 'src/database/database.module';
import { GetClientSearchPreferencesController } from './controllers/get-client-search-preferences.controller';

@Module({
  imports: [DatabaseModule],
  providers: clientProviders,
  exports: clientProviders,
  controllers: [GetClientSearchPreferencesController],
})
export class ClientModule {}
