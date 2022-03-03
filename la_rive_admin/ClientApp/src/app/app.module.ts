import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { RouterModule } from '@angular/router';

import { AppComponent } from './app.component';
import { NavMenuComponent } from './nav-menu/nav-menu.component';
import { HomeComponent } from './home/home.component';
import { NewOrderComponent } from './new-order/new-order.component';
import { OrdersComponent } from './orders/orders.component';
import { OrderComponent } from './order/order.component';
import { LogingComponent } from './loging/loging.component';
import { ItemsComponent } from './items/items.component';

import { OrdersService } from './services/order/order.service';
import { HelperService } from './services/helper/helper.service';

import { OrderGuard } from './order/OrderGuard';

import { Order } from './models/order';
import { RequestService } from './services/request/request.service';
import { LogingService } from './services/loging/loging.service';
import { ItemsService } from './services/items/items.service';
import { LogingGuard } from './loging/LogingGuard';
import { ModuleService } from './services/module/module.service';
import { CheckOutComponent } from './checkout/checkout.component';
import { CategoryService } from './services/category/category.service';

import { FilterItemPipe } from './pipes/filterItemPipe';
import { FilterOrderPipe } from './pipes/filterOrderPipe';
import { NgxLoadingModule } from 'ngx-loading';
import { LoadingService } from './services/loading/loading.service';
import { CostComponent } from './cost/cost.component';

@NgModule({
  declarations: [
    AppComponent,
    NavMenuComponent,
    HomeComponent,
    NewOrderComponent,
    OrdersComponent,
    OrderComponent,
    ItemsComponent,
    LogingComponent,
    CheckOutComponent,
    CostComponent,
    FilterItemPipe,
    FilterOrderPipe
  ],
  imports: [
    BrowserModule.withServerTransition({ appId: 'ng-cli-universal' }),
    HttpClientModule,
    ReactiveFormsModule,
    FormsModule,
    NgxLoadingModule.forRoot({}),
    RouterModule.forRoot([
      { path: 'home', component: HomeComponent, canActivate: [LogingGuard] },
      { path: '', component: LogingComponent },
      { path: 'new-order', component: NewOrderComponent, canActivate: [LogingGuard] },
      { path: 'orders', component: OrdersComponent, canActivate: [LogingGuard] },
      { path: 'order', component: OrderComponent, canActivate: [LogingGuard, OrderGuard] },
      { path: 'items', component: ItemsComponent, canActivate: [LogingGuard] },
      { path: 'cost', component: HomeComponent, canActivate: [LogingGuard] },
      { path: 'calender', component: HomeComponent, canActivate: [LogingGuard] },
      { path: 'checkout', component: CheckOutComponent },
      { path: '**', redirectTo: '' }
    ])
  ],
  providers: [OrdersService,
    HelperService,
    RequestService,
    LogingService,
    ItemsService,
    CategoryService,
    OrderGuard,
    LogingGuard,
    ModuleService,
    LoadingService],
  bootstrap: [AppComponent]
})
export class AppModule { }
