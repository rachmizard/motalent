import { Module } from '@nestjs/common';

import { DatabaseModule } from '@src/database/database.module';
import { CategoryController } from './category.controller';
import { categoryProviders } from './category.providers';

@Module({
  imports: [DatabaseModule],
  controllers: [CategoryController],
  providers: categoryProviders,
  exports: categoryProviders,
})
export class CategoryModule {}
