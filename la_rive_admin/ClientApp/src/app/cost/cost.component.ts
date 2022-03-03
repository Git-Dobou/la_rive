import { Component, Inject, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { OrdersService } from '../services/order/order.service';
import { HelperService } from '../services/helper/helper.service';
import { BehaviorSubject } from 'rxjs';
import { Item } from '../item/item';
import { ItemsService } from '../services/items/items.service';
import { ModuleService } from '../services/module/module.service';
import { Router } from '@angular/router';


@Component({
  selector: 'app-cost',
  templateUrl: './cost.component.html'
})

export class CostComponent implements OnInit {

  constructor(private route: Router) {
    console.log("constructor");
  }
  ngOnInit() {
    
  }
}
