import { Item } from "../item/item";

export class Order {

  public Order() {
  }

  id: string;
  orderNr: string;
  store: string;
  orderContent: string;
  amount: number
  rateAmount: number;
  countRate: number;
  meansOfPayment: MeansOfPayment;
  paymentMethode: PaymentMethode;
  date: Date
  deliveryState: number;
  firstPaymentDate: Date;
}

export enum MeansOfPayment {
  Default,
  Paypal,
  Klarna,
  AfterPay,
  Visa,
  MasterCard,
  Transfer,
  Cash,
}

export enum PaymentMethode {
  Default,
  Total,
  Rate,
}
