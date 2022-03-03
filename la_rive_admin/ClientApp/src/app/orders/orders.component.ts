import { Component, Inject, OnDestroy, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Location } from '@angular/common'
import { Order } from '../models/order';
import { OrdersService } from '../services/order/order.service';
import { HelperService } from '../services/helper/helper.service';
import { OrderFilter } from '../models/OrderFilter';

@Component({
  selector: 'app-orders',
  templateUrl: './orders.component.html'
})

export class OrdersComponent implements OnInit, OnDestroy {

  public orderFilter: OrderFilter;

  constructor(public ordersService: OrdersService,
    public helperService: HelperService,
    private location: Location) {
  }

  ngOnInit() {
    this.ordersService.currentOrder.next(new Order());
    this.orderFilter = new OrderFilter();
    this.orderFilter.dateFilter = '0';
    this.orderFilter.devlivered = '0';
    this.orderFilter.paymentMethode = '0';
    this.orderFilter.meansOfPayment = '0';
    this.orderFilter.paymentRate = '0';
    this.orderFilter.storeName = '';
  }

  ngOnDestroy() {

  }
}
