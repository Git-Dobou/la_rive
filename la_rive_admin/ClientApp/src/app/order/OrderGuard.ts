import { Component, Injectable } from '@angular/core';
import { OrdersService } from '../services/order/order.service';
import { ActivatedRoute, ActivatedRouteSnapshot, CanActivate, Router } from '@angular/router';
import { strict } from 'assert';
import { HelperService } from '../services/helper/helper.service';

@Injectable()
export class OrderGuard implements CanActivate {

  constructor(private ordersService: OrdersService,
    private router: Router) {
  }

  canActivate(route: ActivatedRouteSnapshot): boolean {

    if (this.ordersService.currentOrder.value == null) {
      this.router.navigate(['orders']);
      return false;
    }

    return true;
  }
}
