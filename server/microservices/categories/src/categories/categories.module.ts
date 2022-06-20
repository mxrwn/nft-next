import { Module } from "@nestjs/common";
import { DbModule } from "src/db/db.module";
import { CategoryController } from "./categories.controller";
import { CategoryProvider } from "./categories.provider";
import { CategoryService } from "./categories.service";

@Module({
  imports: [DbModule],
  controllers: [CategoryController],
  providers: [
    ...CategoryProvider,
    CategoryService
  ],
  exports: [...CategoryProvider]
})

export class CategoryModule {}