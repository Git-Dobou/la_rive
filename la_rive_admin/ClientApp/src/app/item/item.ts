import { Category } from "../models/category";
import { Order } from "../models/order";

export class Item {

  public Item() {

  }

  id: string;
  itemName: string;
  itemNr: string;
  payAmount: number;
  sellAmount: number;
  count: number;
  availableCount: number;
  imgData: any;
  size: string;
  category: Category;
  order: Order;
}
