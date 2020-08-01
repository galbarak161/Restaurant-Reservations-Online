import { Component, Input, EventEmitter, Output } from "@angular/core";
import { RestaurantService } from "../../Models/restaurant.service";

@Component({
  selector: 'app-order',
  templateUrl: './order.component.html',
  styleUrls: ['./order.component.css']
})
export class OrderComponent {

  // Input the Restaurant Id and orderDate from restaurant-component
  _resIdAndDate: object;
  @Input()
  set resIdAndDate(resIdAndDate: object) {
    if (resIdAndDate) {
      this._resIdAndDate = resIdAndDate;
      this.restaurantService.getRestaurantsJson("id/" + resIdAndDate["RestaurantId"])
        .subscribe(res => this.resObj = res.json()); //Gets resObj from Database
      this.restaurantService.getRestaurantsJson("id/" + resIdAndDate["RestaurantId"] + "/date/" + resIdAndDate["OrderDate"])
        .subscribe(res => this.orderObj = res.json()); //Gets orderObj from Database
    }}
  get resIdAndDate() { return this._resIdAndDate; }

  // Output the Table number that was choosen
  @Output('tableNumber') tableNumber = new EventEmitter<number>();

  //variables
  resObj: object[];
  orderObj: object[];
  arrOfTables = Array;

  constructor(private restaurantService: RestaurantService) { }

  // Methods

  isTableAvilable(tableId: number): string {
    // Change table CSS according to his status (available or not)
    let cssClasses;
    if (this.orderObj) {
      for (var order of this.orderObj) {
        if (order['TableNumber'] == tableId)
          return "notAvailable";
      }
    }
    return "available";
  }
  
  chooseTable(tableNumber: number): void {
    // Emit the number of table to app-root
    this.tableNumber.emit(tableNumber)
  }
}
