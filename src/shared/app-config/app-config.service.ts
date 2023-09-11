import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';

import { AppDatabaseConfig } from './app-config.configuration';

@Injectable()
export class AppConfigService {
  constructor(private configServce: ConfigService) {}

  getDatabaseConfig(): AppDatabaseConfig {
    return this.configServce.get<AppDatabaseConfig>('database');
  }

  getDatabaseHost(): string {
    return this.getDatabaseConfig().host;
  }

  getDatabasePort(): number {
    return this.getDatabaseConfig().port;
  }

  getDatabaseUsername(): string {
    return this.getDatabaseConfig().user;
  }

  getDatabasePassword(): string {
    return this.getDatabaseConfig().password;
  }

  getDatabaseName(): string {
    return this.getDatabaseConfig().name;
  }
}
