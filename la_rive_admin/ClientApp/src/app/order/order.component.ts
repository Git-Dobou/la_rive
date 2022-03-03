import { Component, OnInit, Input, ViewChild, ElementRef, OnDestroy } from '@angular/core';
import { Location } from '@angular/common';
import { HttpClient } from '@angular/common/http';
import { Order } from '../models/order';
import { Item } from '../item/item';
import { OrdersService } from '../services/order/order.service';
import { ActivatedRoute } from '@angular/router';
import { strict } from 'assert';
import { HelperService } from '../services/helper/helper.service';
import { ModuleService } from '../services/module/module.service';
import { CategoryService } from '../services/category/category.service';
import { BehaviorSubject } from 'rxjs';
import { Category } from '../models/category';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ItemsService } from '../services/items/items.service';
import { Guid } from '../models/guid';
import { CategoryModel } from '../models/categoryModel';
import { LoadingService } from '../services/loading/loading.service';
import { RequestService } from '../services/request/request.service';

@Component({
  selector: 'app-order',
  templateUrl: './order.component.html'
})

export class OrderComponent implements OnInit, OnDestroy {

  showModal: boolean = false;
  imgData: string;
  items: BehaviorSubject<Item[]> = new BehaviorSubject([]);

  addItemForm = new FormGroup({
    itemName: new FormControl('', [Validators.required]),
    itemNr: new FormControl('', [Validators.required]),
    payAmount: new FormControl('', [Validators.required]),
    sellAmount: new FormControl('', [Validators.required]),
    count: new FormControl('', [Validators.required]),
    size: new FormControl('', [Validators.required]),
    imgData: new FormControl('', [Validators.required])
  });

  constructor(public ordersService: OrdersService,
    public itemsService: ItemsService,
    public helperService: HelperService,
    public categoryService: CategoryService,
    private loadingService: LoadingService,
    private activatedroute: ActivatedRoute,
    private requestService: RequestService,
    private moduleService: ModuleService) {

    this.initItems();
  }

  initItems() {
    var tmpItems = [] as Item[];

    console.log(this.itemsService.items.value);
    this.itemsService.items.value.forEach(item => {
      console.log(item);
      if (this.ordersService.currentOrder.value.orderNr == item.order.orderNr) {
        tmpItems.push(item);
      }
    });

    this.items.next(tmpItems);
  }

  ngOnInit() {
    this.initItems();
  }

  ngOnDestroy() {
    this.categoryService.currentCategory.next(new CategoryModel());
    this.categoryService.moduleCategories.next([]);
  }

  selectCategory(category: CategoryModel) {
    this.categoryService.currentCategory.next(category);
    var cats = this.categoryService.moduleCategories.value;
    cats.push(category);
    this.categoryService.moduleCategories.next(cats);
  }

  backCategory() {
    var cats = this.categoryService.moduleCategories.value;
    if (cats.length == 1) {
      return;
    }

    cats.splice(cats.length - 1, 1);
    this.categoryService.moduleCategories.next(cats);
    this.categoryService.currentCategory.next(cats[cats.length - 1]);
  }

  close() {
    this.showModal = false;
  }

  clickImage(item: Item) {
    this.showModal = true;
    this.imgData = item.imgData;
    console.log(this.imgData);
  }

  editItem(item: Item) {
    this.addItemForm.get('itemName').setValue(item.itemName);
    this.addItemForm.get('itemNr').setValue(item.itemNr);
    this.addItemForm.get('payAmount').setValue(item.payAmount);
    this.addItemForm.get('sellAmount').setValue(item.sellAmount);
    this.addItemForm.get('count').setValue(item.count);
    this.addItemForm.get('size').setValue(item.size);
    this.addItemForm.get('imgData').setValue(item.imgData);
  }

  deleteItem(item: Item) {
    this.requestService.post<boolean>('items/delete', item).subscribe(result => {
      if (result) {
        var index = this.itemsService.items.value.findIndex(i => i.itemNr == item.itemNr);
        var tmpItems = this.items.value;
        tmpItems.splice(index, 1);

        this.itemsService.items.next(tmpItems);
        this.loadingService.loading.next(false);
        this.initItems();
      }
    },
      error => {
        console.error(error);
        this.loadingService.loading.next(false);
      });
  }

  isAddItemFormElementValid(element: string): boolean {
    return this.addItemForm.get(element).valid;
  }

  saveItem() {
    var item = this.addItemForm.value as Item;
    item.order = this.ordersService.currentOrder.value;

    var index = this.itemsService.items.value.findIndex(i => i.itemNr == item.itemNr);
    if (index > 0) {
      var tmpItem = this.itemsService.items.value[index] as Item;
      item.category = tmpItem.category;
      item.availableCount = tmpItem.availableCount;
      item.id = tmpItem.id;

      this.requestService.post<boolean>('items/update', item).subscribe(result => {
        if (result) {
          var tmpItems = this.itemsService.items.value;
          tmpItems.splice(index, 1);
          tmpItems.push(item);

          this.itemsService.items.next(tmpItems);

          this.addItemForm.reset();
          this.categoryService.moduleCategories.value.splice(1, this.categoryService.moduleCategories.value.length - 2);
          this.categoryService.currentCategory.next(this.categoryService.moduleCategories.value[this.categoryService.moduleCategories.value.length - 1]);
          this.loadingService.loading.next(false);

          this.initItems();
        }
      },
        error => {
          console.error(error);
          this.loadingService.loading.next(false);
        });

      return;
    }

    item.id = Guid.newGuid();
    item.availableCount = item.count;
    item.category = this.categoryService.currentCategory.value.category;

    this.requestService.post<boolean>('items/new', item).subscribe(result => {
      if (result) {
        var tmpItems = this.itemsService.items.value as Item[];
        tmpItems.push(item);
        this.itemsService.items.next(tmpItems);

        this.addItemForm.reset();
        this.categoryService.moduleCategories.value.splice(1, this.categoryService.moduleCategories.value.length - 2);
        this.categoryService.currentCategory.next(this.categoryService.moduleCategories.value[this.categoryService.moduleCategories.value.length - 1]);

        this.loadingService.loading.next(false);
        this.initItems();
      }
    },
      error => {
        console.error(error);
        this.loadingService.loading.next(false);
      });
  }

  file: any;
  fileChanged(e) {
    this.file = e.target.files[0];
    this.uploadDocument(this.file);
  }

  uploadDocument(file) {
    let fileReader = new FileReader();
    fileReader.onload = (e) => {
      this.addItemForm.get('imgData').setValue(fileReader.result);
    }
    fileReader.readAsDataURL(this.file);
  }

  generateItemNumber() {
    var nr = "";
    nr += "DG";
    nr += "-";
    nr += "RVE";
    nr += "-";
    nr += "ITM";
    nr += "-";
    nr += this.ordersService.currentOrder.value.orderNr.split('-')[3];
    nr += "-";
    var i = 0;

    while (i < 5) {
      nr += this.getRandomInt(0, 9);
      i++;
    }

    nr += this.getRandomString(1);

    console.log(nr);
    this.addItemForm.get('itemNr').setValue(nr);
  }

  private getRandomInt(min, max): number {
    min = Math.ceil(min);
    max = Math.floor(max);
    return Math.floor(Math.random() * (max - min + 1)) + min;
  }

  private getRandomString(length) {
    var randomChars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ';
    var result = '';
    for (var i = 0; i < length; i++) {
      result += randomChars.charAt(Math.floor(Math.random() * randomChars.length));
    }
    return result;
  }
}

