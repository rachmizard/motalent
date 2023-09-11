import { Module } from '@nestjs/common';
import { databaseProviders } from './database.providers';
import { AppConfigModule } from 'src/shared/app-config/app-config.module';
@Module({
  imports: [AppConfigModule],
  providers: databaseProviders,
  exports: databaseProviders,
})
export class DatabaseModule {}
