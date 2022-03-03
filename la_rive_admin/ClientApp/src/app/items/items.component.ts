import { Component, Inject, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { OrdersService } from '../services/order/order.service';
import { HelperService } from '../services/helper/helper.service';
import { BehaviorSubject } from 'rxjs';
import { Item } from '../item/item';
import { ItemsService } from '../services/items/items.service';
import { ModuleService } from '../services/module/module.service';
import { Router } from '@angular/router';
import { CategoryService } from '../services/category/category.service';
import { ItemFilter } from '../models/itemFilter';


@Component({
  selector: 'app-items',
  templateUrl: './items.component.html'
})

export class ItemsComponent implements OnInit {

  public itemFilter: ItemFilter;

  public showModal: boolean;
  public imgData: string;

  constructor(private ordersService: OrdersService,
    public itemsService: ItemsService,
    private moduleService: ModuleService,
    public categoryService: CategoryService,
    private route: Router) {

    this.itemFilter = new ItemFilter();
    this.itemFilter.itemNr = '';
    this.itemFilter.storeName = '';
    this.itemFilter.stock = '';
  }

  close() {
    this.showModal = false;
  }

  clickImage(item: Item) {
    this.showModal = true;
    this.imgData = item.imgData;
    console.log(this.imgData);
  }

  goto(item: Item) {
    console.log(item.itemNr.split('-'));
    var orderNr = item.itemNr.split('-')[3];
    this.ordersService.orders.value.forEach(oo => console.log(oo.orderNr.split('-')));
    var order = this.ordersService.orders.value.find(o => o.orderNr.split('-')[3] == orderNr);
    console.log(order);
    this.ordersService.currentOrder.next(order);
    this.route.navigate(['order']);
  }

  ngOnInit() {
    this.itemFilter = new ItemFilter();
    this.itemFilter.itemNr = '';
    this.itemFilter.storeName = '';
    this.itemFilter.stock = '';
  }
}
