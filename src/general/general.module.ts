import { Module } from '@nestjs/common';

import { LocationModule } from './location.module';
import { CategoryModule } from './category/category.module';

@Module({
  imports: [LocationModule, CategoryModule],
})
export class GeneralModule {}
