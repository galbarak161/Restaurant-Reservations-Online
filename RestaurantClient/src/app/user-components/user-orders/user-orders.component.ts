import { Component, Input, EventEmitter, Output } from "@angular/core";
import { RestaurantService } from "../../Models/restaurant.service";
import { UserService } from "../../Models/user.service";

@Component({
  selector: 'app-user-orders',
  templateUrl: './user-orders.component.html',
  styleUrls: ['./user-orders.component.css']
})
export class UserOrdersComponent {

  @Output('orderCanceled') orderCanceled = new EventEmitter<object>(); //Emit that order has been canceld

  // input the User orders after login
  _userOrders: object[];
  @Input()
  set userOrders(userOrders: object[]) {
    if (userOrders) {
      this._userOrders = userOrders;
      this.UserService.getUserOrders(sessionStorage.getItem('UserId')).subscribe(res => this.userOrders = res.json());
    }
  }
  get userOrders() { return this._userOrders; }

  constructor(private restaurantService: RestaurantService, private UserService: UserService ) { }

  // Methods
  cancel(id: number){
    this.restaurantService.deleteOrder(id).subscribe(); // Delete order from Tables TBL
    this.orderCanceled.emit(); // Emit to app-root that order has been canceled
  }
}