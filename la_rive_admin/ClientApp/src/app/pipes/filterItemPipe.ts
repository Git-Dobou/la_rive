import { Pipe, PipeTransform } from "@angular/core";
import { Item } from "../item/item";
import { Category } from "../models/category";
import { CategoryModel } from "../models/categoryModel";
import { ItemFilter } from "../models/itemFilter";
import { Order } from "../models/order";
import { CategoryService } from "../services/category/category.service";
import { OrdersService } from "../services/order/order.service";

@Pipe({
  name: 'filterItems',
  pure: false
})

export class FilterItemPipe implements PipeTransform {

  constructor(private categoryService: CategoryService,
    private ordersService: OrdersService) {
  }

  transform(items: Item[], filter: ItemFilter): Item[] {
    var tmpItems = [] as Item[];

    items.forEach(i => {
      var a = this.categoryOk(i.category);

      if ((filter.itemNr == '' || (filter.itemNr != '' && i.itemNr.includes(filter.itemNr)))
        && (filter.storeName == '' || (filter.storeName != '' && i.order.store.includes(filter.storeName)))
        && this.categoryOk(i.category)) {
        tmpItems.push(i);
      }
    });

    return tmpItems;
  }

  private categoryOk(itemCategory: Category): boolean {

    if (this.getRecur(this.categoryService.currentCategory.value, itemCategory)) {
      return true;
    }

    return false;
  }

  getRecur(cat: CategoryModel, itemCat: Category): boolean {

    if (cat.category.id === itemCat.id) {
      return true;
    }

    if (cat.sub.length === 0) {
      return false;
    }

    for (let c of cat.sub) {
      if (this.getRecur(c, itemCat)) {
        return true;
      }
    }

    return false;
  }
}