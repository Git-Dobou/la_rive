import { Component, OnDestroy, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { MeansOfPayment, Order } from '../models/order'
import { OrdersService } from '../services/order/order.service';

@Component({
  selector: 'app-new-order-component',
  templateUrl: './new-order.component.html'
})
export class NewOrderComponent implements OnInit, OnDestroy {

  addOrderForm = new FormGroup({
    orderNr: new FormControl('', [Validators.required]),
    store: new FormControl('', [Validators.required]),
    date: new FormControl('', [Validators.required]),
    orderContent: new FormControl('', [Validators.required]),
    amount: new FormControl('', [Validators.required]),
    meansOfPayment: new FormControl('', [Validators.required]),
    paymentMethode: new FormControl('', [Validators.required]),
    countRate: new FormControl('', [Validators.required]),
    rateAmount: new FormControl('', [Validators.required]),
    firstPaymentDate: new FormControl('', [Validators.required])
  });

  constructor(private ordersService: OrdersService,
    private route: Router) {
    this.test();
  }

  isAddItemFormElementValid(element: string): boolean {
    return this.addOrderForm.get(element).valid;
  }

  getValueAddOrderFormElement(element: string): any {
    return this.addOrderForm.get(element).value;
  }

  generateItemNumber() {

    var nr = "";
    nr += "DG";
    nr += "-";
    nr += "RVE";
    nr += "-";
    nr += "ODR";
    nr += "-";
    var i = 0;

    while (i < 8) {
      nr += this.getRandomInt(0, 9);
      i++;
    }

    console.log(nr);
    this.addOrderForm.get('orderNr').setValue(nr);
  }

  private getRandomInt(min, max): number {
    min = Math.ceil(min);
    max = Math.floor(max);
    return Math.floor(Math.random() * (max - min + 1)) + min;
  }

  save() {
    var order = this.addOrderForm.value as Order;
    order.paymentMethode = Number(order.paymentMethode);
    order.meansOfPayment = Number(order.meansOfPayment);
    console.log(order);
    console.log(this.ordersService.currentOrder.value);

    order.id = this.ordersService.currentOrder.value.id;
    order.deliveryState = this.ordersService.currentOrder.value.deliveryState == undefined ? 0 : this.ordersService.currentOrder.value.deliveryState;

    this.ordersService.addOrder(order);
    this.addOrderForm.reset();
  }

  test() {
    this.generateItemNumber();
    this.addOrderForm.get("meansOfPayment").setValue(2);
    this.addOrderForm.get("date").setValue("2022-10-02");
    this.addOrderForm.get("firstPaymentDate").setValue("2022-10-02");
    this.addOrderForm.get("paymentMethode").setValue(2);
    this.addOrderForm.get("amount").setValue(145.9);
    this.addOrderForm.get("rateAmount").setValue(12.8);
    this.addOrderForm.get("countRate").setValue(12);
    this.addOrderForm.get("store").setValue("Primark");
    this.addOrderForm.get("orderContent").setValue("Talon");
  }

  ngOnInit() {
    console.log(this.ordersService.currentOrder.value);
    if (this.ordersService.currentOrder.value != null && this.ordersService.currentOrder.value.id != null) {
      this.addOrderForm.get("meansOfPayment").setValue(this.ordersService.currentOrder.value.meansOfPayment);
      this.addOrderForm.get("orderNr").setValue(this.ordersService.currentOrder.value.orderNr);
      this.addOrderForm.get("date").setValue(this.ordersService.currentOrder.value.date.toString().split('T')[0]);
      this.addOrderForm.get("firstPaymentDate").setValue(this.ordersService.currentOrder.value.firstPaymentDate.toString().split('T')[0]);
      this.addOrderForm.get("paymentMethode").setValue(this.ordersService.currentOrder.value.paymentMethode);
      this.addOrderForm.get("amount").setValue(this.ordersService.currentOrder.value.amount);
      this.addOrderForm.get("rateAmount").setValue(this.ordersService.currentOrder.value.rateAmount);
      this.addOrderForm.get("countRate").setValue(this.ordersService.currentOrder.value.countRate);
      this.addOrderForm.get("store").setValue(this.ordersService.currentOrder.value.store);
      this.addOrderForm.get("orderContent").setValue(this.ordersService.currentOrder.value.orderContent);

      console.log(this.addOrderForm);
    }
  }

  ngOnDestroy() {
    this.ordersService.currentOrder.next(new Order());
  }
}
