import { Provider } from '@nestjs/common';
import { DataSource } from 'typeorm';

import { AppConfigService } from 'src/shared/app-config/app-config.service';
import { locator } from 'src/shared/di.types';

export const databaseProviders: Provider[] = [
  {
    provide: locator.dataSource,
    inject: [locator.appConfigService],
    useFactory: async (configService: AppConfigService) => {
      const dataSource = new DataSource({
        type: 'postgres', // Change to your database type
        host: configService.getDatabaseHost(),
        port: configService.getDatabasePort(),
        username: configService.getDatabaseUsername(),
        password: configService.getDatabasePassword(),
        database: configService.getDatabaseName(),
        entities: [__dirname + '/../**/*.entity{.ts,.js}'],
        synchronize: configService.getDatabaseAutoSynchronize(), // Set to false in production,
        migrations: [__dirname + '/../../db/migrations/*{.ts,.js}'],
        migrationsRun: false,
      });

      return dataSource.initialize();
    },
  },
];
