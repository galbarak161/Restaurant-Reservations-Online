//Default
import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

//Manually Imports
import { ReactiveFormsModule } from '@angular/forms'; // Forms
import { FormsModule } from '@angular/forms';  //Two Way Binding
import { HttpModule } from '@angular/http'; //Http for using JSON

//Component
import { AppComponent } from './app-root/app.component';

import { RestaurantComponent } from './orders-components/restaurant/restaurant.component';
import { OrderComponent } from './orders-components/order/order.component';
import { NewOrderComponent } from './orders-components/new-order/new-order.component';

import { UserOrdersComponent } from './user-components/user-orders/user-orders.component';
import { LoginComponent } from './user-components/login/login.component';
import { RegisterComponent } from './user-components/register/register.component';

//Service
import { RestaurantService } from './Models/restaurant.service';
import { UserService } from './Models/user.service';
import { TestComponent } from './test/test.component';
import { RandomUserService } from './test/random-user.service';


import { HttpClientModule } from '@angular/common/http'; //HTTP Client

@NgModule({
  declarations: [
    AppComponent,
    RestaurantComponent,
    OrderComponent,
    NewOrderComponent,
    LoginComponent,
    RegisterComponent,
    NewOrderComponent,
    UserOrdersComponent,
    TestComponent,
  ],
  imports: [
    BrowserModule,
    ReactiveFormsModule, //Forms
    FormsModule, //Two Way Binding
    HttpModule, //HTTP
    HttpClientModule //HTTP Client
    ],
  providers: [RestaurantService, UserService,RandomUserService],
  bootstrap: [AppComponent]
})
export class AppModule { }
