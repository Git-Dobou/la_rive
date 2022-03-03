import { HttpClient } from '@angular/common/http';
import { Inject, Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { BehaviorSubject } from 'rxjs';
import { Item } from '../../item/item';
import { User } from '../../loging/user';
import { CategoryModel } from '../../models/categoryModel';
import { Order } from '../../models/order';
import { CategoryService } from '../category/category.service';
import { ItemsService } from '../items/items.service';
import { LoadingService } from '../loading/loading.service';
import { OrdersService } from '../order/order.service';
import { RequestService } from '../request/request.service';

@Injectable()
export class LogingService {

  currentUser: BehaviorSubject<User> = new BehaviorSubject(null);
  connected: BehaviorSubject<boolean> = new BehaviorSubject(false);

  constructor(private http: HttpClient,
    private requestService: RequestService,
    private ordersService: OrdersService,
    private itemsService: ItemsService,
    private categoryService: CategoryService,
    private loadingService: LoadingService,
    private router: Router,
    @Inject('BASE_URL') private baseUrl: string) {
  }

  getUser(user: User) {
    this.requestService.post<User>('loging/connect', user).subscribe(result => {
      console.log(result);
      if (result == null) {
        this.connected.next(false);
      }
      else {
        this.connected.next(true);
        this.setValueLocalStorage('loginStatus', '1');
        this.setValueLocalStorage('jwt', '1');
        this.setValueLocalStorage('userName', result.userName);
        this.setValueLocalStorage('expiration', '100');
        this.currentUser.next(result);

        this.requestService.get<Order[]>('orders/all').subscribe(result => {
          console.log('load orders');
          this.ordersService.orders.next(result);

          this.requestService.get<Item[]>('items/all').subscribe(result => {
            console.log('load items');
            this.itemsService.items.next(result);

            this.requestService.get<CategoryModel>('category/get').subscribe(result => {
              console.log('load categories');
              this.categoryService.principalCategory.next(result);
              this.categoryService.selectCategory(result);
              this.loadingService.loading.next(false);

              this.router.navigate(['orders']);
            },
              error => {
                console.error(error);
                this.loadingService.loading.next(false);
              });
          },
            error => {
              console.error(error);
              this.loadingService.loading.next(false);
            });
        },
          error => {
            console.error(error);
            this.loadingService.loading.next(false);
          });
      }
    },
      error => console.error(error));
  }

  logout() {
    this.connected.next(false);
    this.removeValueLocalStorage('loginStatus');
    this.removeValueLocalStorage('jwt');
    this.removeValueLocalStorage('userName');
    this.removeValueLocalStorage('expiration');
    this.currentUser.next(new User());
  }

  setValueLocalStorage(name: string, value: string) {
    localStorage.setItem(name, value);
  }

  removeValueLocalStorage(name: string) {
    localStorage.removeItem(name);
  }
}
