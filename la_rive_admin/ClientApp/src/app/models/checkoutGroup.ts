import { CheckouItem } from "./checkoutItem";

export class CheckoutGroup {

  public CheckoutGroup() {
  }

  _Id: string;
  checkoutItems: CheckouItem[];
  discount: number;
}
