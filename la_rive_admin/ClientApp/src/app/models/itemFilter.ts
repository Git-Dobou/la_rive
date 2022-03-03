import { Category } from "./category";

export class ItemFilter {

  public ItemFilter() {
    this.itemNr = '';
    this.storeName = '';
  }

  itemNr: string;
  storeName: string;
  stock: string;
  categorie: Category[];
}
