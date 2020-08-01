import { Component } from '@angular/core';
import { RestaurantService } from '../Models/restaurant.service';
import { UserService } from '../Models/user.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {

  constructor(private restaurantService: RestaurantService, private userService: UserService) {
    this.userService.getUsersJson()
      .subscribe(res => this.users = res.json()); // Getting all users from Database
  }

  // Variables 
  resIdAndDate: object; // From restaurant.component
  tableNumber: number; // From order-component
  orderObj: number; // Get the value from getTableNumber()


  userName: string = "User"; // For handling user name with sessionStorage
  users: object[]; // all Users from Database
  userOrders: object[]; // all User orders from Database

  // Taggle Variables
  hideLogin: boolean = true;
  hideReg: boolean = true;
  hideOrderComponent: boolean = true;
  hideUserOrderComponent: boolean = true;

  registerToggle(): void {
    this.hideLogin = true;
    this.hideReg = !this.hideReg;
  }
  loginToggle(): void {
    this.hideReg = true;
    this.hideLogin = !this.hideLogin;
  }


  // Orders Methods
  getRes(resIdAndDate: object): void {
    this.resIdAndDate = resIdAndDate;
    this.hideOrderComponent = false;
    this.hideUserOrderComponent = true;
    this.restaurantService.addNewOrder(resIdAndDate).subscribe(); // add new row in Restaurant_Order Table
  }

  getTableNumber(tableNumber): void {
    // Handling with tableNumber and OrderObj
    this.tableNumber = tableNumber;
    this.restaurantService.getOrderId(this.resIdAndDate["RestaurantId"], this.resIdAndDate["OrderDate"]).subscribe(res => this.orderObj = res.json());
    this.hideUserOrderComponent = false;
  }

  orderHasChange(): void {
    this.hideOrderComponent = true;
    this.hideUserOrderComponent = true;
    this.userService.getUserOrders(sessionStorage.getItem('UserId'))
      .subscribe(res => this.userOrders = res.json()); // Get Updated user Orders
  }

  // User Methods
  logOut(): void {
    sessionStorage.clear();
    this.userName = 'User';
  }

  login(): void {
    this.userName = sessionStorage.getItem('Name');
    this.userService.getUserOrders(sessionStorage.getItem('UserId'))
      .subscribe(res => this.userOrders = res.json()); // Get all user Orders by UserId from sessionStorage
    this.hideLogin = true
  }

  register(user: object): void {
    this.userService.getUsersJson()
      .subscribe(res => this.users = res.json()); // Add new User to Database
    this.hideReg = true;
  }
}
