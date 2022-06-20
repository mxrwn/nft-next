import { Controller } from "@nestjs/common";
import { MessagePattern } from "@nestjs/microservices";
import { CategoryService } from "./categories.service";

@Controller()
export class CategoryController {
  constructor(private readonly categoryService: CategoryService){
    
  }
  @MessagePattern('get_categories')
  async getCategories() : Promise<any> {
    return this.categoryService.get()
  }
  @MessagePattern('get_category')
  async getCategory(name) : Promise<any> {
    return this.categoryService.getCategory(name)
  }
  @MessagePattern('create_category')
  async createCategory(data: any) : Promise<any> {
    return this.categoryService.create(data)
  }
}