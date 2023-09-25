import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';

import {
  AppDatabaseConfig,
  AppHttpConfiguration,
  AppLocationConfig,
} from './app-config.configuration';

@Injectable()
export class AppConfigService {
  constructor(private configServce: ConfigService) {}

  getAppPort(): number {
    return this.configServce.get<number>('port');
  }

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

  getDatabaseAutoSynchronize(): boolean {
    return this.getDatabaseConfig().syncronize;
  }

  getLocationConfig(): AppLocationConfig {
    return this.configServce.get<AppLocationConfig>('location');
  }

  getHttpConfig(): AppHttpConfiguration {
    return this.configServce.get<AppHttpConfiguration>('http');
  }

  getJwtSecret(): string {
    return this.configServce.get<string>('jwtSecret');
  }

  getJwtExpirationTime(): string {
    return this.configServce.get<string>('jwtExpirationTime');
  }

  getJwtRefreshSecret(): string {
    return this.configServce.get<string>('jwtRefreshSecret');
  }

  getJwtRefreshExpirationTime(): string {
    return this.configServce.get<string>('jwtRefreshExpirationTime');
  }
}
