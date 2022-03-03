import { Pipe, PipeTransform } from "@angular/core";
import { Item } from "../item/item";
import { ItemFilter } from "../models/itemFilter";
import { Order } from "../models/order";
import { OrderFilter } from "../models/OrderFilter";
import { CategoryService } from "../services/category/category.service";
import { OrdersService } from "../services/order/order.service";

@Pipe({
  name: 'filterOrders',
  pure: false
})

export class FilterOrderPipe implements PipeTransform {

  constructor(private categoryService: CategoryService,
    private ordersService: OrdersService) {
  }

  transform(orders: Order[], filter: OrderFilter): Order[] {

    var tmpOrders = [] as Order[];

    orders.forEach(order => {

      if ((filter.intervalFrom == null || filter.intervalFrom.toString() == '' || order.date >= filter.intervalFrom)
        && (filter.intervalTo == null || filter.intervalTo.toString() == '' || order.date <= filter.intervalTo)
        && order.store.includes(filter.storeName)
        && (Number(filter.paymentMethode) == 0 || Number(order.paymentMethode) == Number(filter.paymentMethode))
        && (Number(filter.meansOfPayment) == 0 || Number(order.meansOfPayment) == Number(filter.meansOfPayment))) {

        tmpOrders.push(order);
      }

      /*tmpOrders = filter.dateFilter == '1' ? tmpOrders.sort((a, b) => new Date(a.date.toDateString()) - new Date(b.date.toDateString()))
        : filter.dateFilter == '2' ? tmpOrders.sort((a, b) => new Date(b.date.toDateString()) - new Date(a.date.toDateString()))
          : tmpOrders;*/

      tmpOrders = filter.priceFilter == '1' ? tmpOrders.sort((a, b) => a.amount - b.amount)
        : filter.priceFilter == '2' ? tmpOrders.sort((a, b) => b.amount - a.amount)
          : tmpOrders;

    });

    return tmpOrders;
  }
}
