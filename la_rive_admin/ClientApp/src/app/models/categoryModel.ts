import { Category } from "./category";

export class CategoryModel {

  public CategoryModel() {

  }

  category: Category;
  parent: Category;
  sub: CategoryModel[];
}
