import { Inject, Injectable } from "@nestjs/common";
import { Model } from "mongoose";
import { Category } from "src/schemas/category.schema";

@Injectable()
export class CategoryService {
  constructor(@Inject('CATEGORY_MODEL') private categoryModel: Model<Category>) {}
  get() {
    return this.categoryModel.find().exec()
  }
  getCategory(name) {
    try {
      const found = this.categoryModel.findOne({name});
      return found;
    } catch (error) {
      return {};
    }
  }
  create(data) {
    try {
      const category = new this.categoryModel(data)
      return category.save()
    } catch (error) {
      return {}
    }
  }
}