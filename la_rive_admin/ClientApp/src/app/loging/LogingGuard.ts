import { Component, Injectable } from '@angular/core';
import { OrdersService } from '../services/order/order.service';
import { ActivatedRoute, ActivatedRouteSnapshot, CanActivate, Router } from '@angular/router';
import { strict } from 'assert';
import { HelperService } from '../services/helper/helper.service';
import { LogingService } from '../services/loging/loging.service';

@Injectable()
export class LogingGuard implements CanActivate {

  constructor(private ordersService: OrdersService,
    private logingService: LogingService,
    private router: Router) {
  }

  canActivate(route: ActivatedRouteSnapshot): boolean {

    var cockies = localStorage.getItem('loginStatus');

    if (cockies == '1') {
      this.logingService.connected.next(true);
      return true;
    }

    this.router.navigate(['']);
    return false;
  }
}
