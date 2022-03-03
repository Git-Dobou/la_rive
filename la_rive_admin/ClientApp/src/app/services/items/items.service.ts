import { HttpClient } from '@angular/common/http';
import { Inject, Injectable } from '@angular/core';
import { BehaviorSubject, Observable, of } from 'rxjs';
import { RequestService } from '../request/request.service';
import { Order } from '../../models/order';
import { Item } from '../../item/item';
import { OrdersService } from '../order/order.service';
import { LoadingService } from '../loading/loading.service';


@Injectable()
export class ItemsService {

  items: BehaviorSubject<Item[]> = new BehaviorSubject([]);

  constructor(private http: HttpClient,
    @Inject('BASE_URL') private baseUrl: string,
    private requestService: RequestService,
    private loadingService: LoadingService,
    private ordersService: OrdersService) {
  }

  deleteItem(item: Item): boolean {
    this.requestService.post<boolean>('items/delete', item).subscribe(result => {
      if (result) {
        var index = this.items.value.findIndex(i => i.itemNr == item.itemNr);
        var tmpItems = this.items.value;
        tmpItems.splice(index, 1);

        this.items.next(tmpItems);
        this.loadingService.loading.next(false);

        return true;
      }
    },
      error => {
        console.error(error);
        this.loadingService.loading.next(false);
      });

    return false;
  }

  addItem(item: Item): boolean {

    var index = this.items.value.findIndex(i => i.itemNr == item.itemNr);
    if (index > 0) {
      this.requestService.post<boolean>('items/update', item).subscribe(result => {
        if (result) {
          var tmpItem = this.items[index];
          tmpItem = item;
          this.loadingService.loading.next(false);

          return true;
        }
      },
        error => {
          console.error(error);
          this.loadingService.loading.next(false);
        });

      return;
    }

    this.requestService.post<boolean>('items/new', item).subscribe(result => {
      if (result) {
        var tmpItems = this.items.value as Item[];
        tmpItems.push(item);

        this.items.next(tmpItems);
        this.loadingService.loading.next(false);

        return true;
      }
    },
      error => {
        console.error(error);
        this.loadingService.loading.next(false);
      });

    return false;
  }

  getItems() {
    this.requestService.get<Item[]>('items/all').subscribe(result => {
      this.items.next(result);
      console.log(result);
      this.loadingService.loading.next(false);
    },
      error => {
        console.error(error);
        this.loadingService.loading.next(false);
      });
  }

  findItem(nr: string): Item {
    return this.items.value.find(item => item.itemNr == nr);
  }
}