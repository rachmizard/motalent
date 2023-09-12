import { Module } from '@nestjs/common';

import { LocationModule } from './location.module';

@Module({
  imports: [LocationModule],
})
export class GeneralModule {}
