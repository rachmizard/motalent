import { Inject, Injectable } from '@nestjs/common';
import { locator } from '@src/shared/di.types';
import { Repository } from 'typeorm';
import { CategoryEntity } from './category.entity';

@Injectable()
export class CategoryService {
  constructor(
    @Inject(locator.categoryRepository)
    private readonly categoryRepo: Repository<CategoryEntity>,
  ) {}

  public async getCategories() {
    return await this.categoryRepo.find();
  }
}
