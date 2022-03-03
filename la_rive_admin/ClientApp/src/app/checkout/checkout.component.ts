import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { BehaviorSubject } from 'rxjs';
import { CheckoutGroup } from '../models/checkoutGroup';
import { CheckouItem } from '../models/checkoutItem';
import { MeansOfPayment, Order } from '../models/order'
import { ItemsService } from '../services/items/items.service';
import { OrdersService } from '../services/order/order.service';

@Component({
  selector: 'app-checkout-component',
  templateUrl: './checkout.component.html'
})
export class CheckOutComponent implements OnInit {

  error: boolean = false;
  checkoutGroup: BehaviorSubject<CheckoutGroup> = new BehaviorSubject(new CheckoutGroup());

  addCheckouItemForm: FormGroup = new FormGroup({
    itemNr: new FormControl('', [Validators.required]),
    count: new FormControl('', [Validators.required])
  })

  constructor(private itemsService: ItemsService, private ordersService: OrdersService) {
  }

  checkOut() {
    var checkouItem = new CheckouItem();
    checkouItem.itemNr = this.addCheckouItemForm.get('itemNr').value;
    checkouItem.count = Number(this.addCheckouItemForm.get('count').value);
    checkouItem.item = this.itemsService.findItem(checkouItem.itemNr)

    if (checkouItem.item == null) {

      this.error = true;
      console.log(this.error);
      return;
    }

    console.log(checkouItem);
    this.checkoutGroup.value.checkoutItems.push(checkouItem);
  }

  edit(checkouItem: CheckouItem) {

  }

  delete(checkouItem: CheckouItem) {

  }

  ngOnInit() {
    this.checkoutGroup.value.checkoutItems = [];
  }
}

//DG-RVE-ITM-04719206-73731025D
