import { HttpClient } from '@angular/common/http';
import { Inject, Injectable } from '@angular/core';
import { BehaviorSubject, Observable, of } from 'rxjs';
import { RequestService } from '../request/request.service';
import { Order, PaymentMethode } from '../../models/order';
import { Item } from '../../item/item';
import { Router } from '@angular/router';
import { LoadingService } from '../loading/loading.service';
import { Guid } from '../../models/guid';


@Injectable()
export class OrdersService {

  sum: number = 0;

  orders: BehaviorSubject<Order[]> = new BehaviorSubject([]);
  currentOrder: BehaviorSubject<Order> = new BehaviorSubject(null);

  constructor(private http: HttpClient,
    private route: Router,
    @Inject('BASE_URL') private baseUrl: string,
    private requestService: RequestService,
    private loadingService: LoadingService) {
    this.sum = 0;
  }

  deleteOrder() {
    this.requestService.post('orders/delete', this.currentOrder.value).subscribe(result => {
      this.requestService.get<Order[]>('orders/all').subscribe(result => {
        this.orders.next(result);
        this.route.navigate(['orders']);
        this.loadingService.loading.next(false);
      });

    }, error => {
      console.log(error);
      this.loadingService.loading.next(false);
    });
  }

  getOrders() {
    this.requestService.get<Order[]>('orders/all').subscribe(result => {
      this.orders.next(result);
      let items: Item[] = [];
      this.orders.value.forEach(order => {
        this.sum += order.amount;
      });

      this.loadingService.loading.next(false);

    },
      error => {
        console.error(error);
      });
  }

  addOrder(order: Order) {
    console.log(order);

    order.id = Guid.newGuid();

    if (order.paymentMethode == PaymentMethode.Total) {
      order.countRate = 0;
      order.rateAmount = 0;
    }

    if (this.orders.value.find(o => o.id == order.id) != null) {
      this.pushOrder(order, 'orders/update');
      return;
    }

    this.pushOrder(order, 'orders/new');
  }

  private pushOrder(order: Order, api: string) {
    this.requestService.post<Order[]>(api, order).subscribe(result => {
      this.requestService.get<Order[]>('orders/all').subscribe(result => {
        this.orders.next(result);
        this.route.navigate(['orders']);
        this.loadingService.loading.next(false);
      });
    },
      error => {
        console.error(error);
      });
  }

  updateOrder(order: Order) {
    this.pushOrder(order, "orders/update");
  }
}
