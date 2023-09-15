import { CacheInterceptor } from '@nestjs/cache-manager';
import {
  Controller,
  Get,
  HttpCode,
  HttpStatus,
  UseInterceptors,
} from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';

import { Public } from '@src/auth/auth.decorator';
import { ApiOkeBaseResponse } from '@src/shared/decorators/swagger.decorator';
import { BaseResponse } from '@src/shared/response/base.response';
import { CategoryService } from './category.service';
import { GetCategoryDTO } from './dtos/get-category.dto';

@ApiTags('General')
@Controller()
@UseInterceptors(CacheInterceptor)
export class CategoryController {
  constructor(private readonly categoryService: CategoryService) {}

  @Get()
  @Public()
  @HttpCode(HttpStatus.OK)
  @ApiOkeBaseResponse(GetCategoryDTO)
  public async getCategories() {
    const categories = await this.categoryService.getCategories();
    return BaseResponse.success(categories, 'Get all categories');
  }
}
