import { Provider } from '@nestjs/common';
import { locator } from '@src/shared/di.types';
import { DataSource } from 'typeorm';
import { CategoryEntity } from './category.entity';
import { CategoryService } from './category.service';

export const categoryProviders: Provider[] = [
  CategoryService,
  {
    provide: locator.categoryRepository,
    inject: [locator.dataSource],
    useFactory: (dataSource: DataSource) =>
      dataSource.getRepository<CategoryEntity>(CategoryEntity),
  },
];
