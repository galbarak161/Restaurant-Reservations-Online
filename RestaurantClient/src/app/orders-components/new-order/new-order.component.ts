import { Component, Input, EventEmitter, Output } from "@angular/core";
import { FormGroup, FormControl, Validators } from "@angular/forms";
import { RestaurantService } from "../../Models/restaurant.service";


@Component({
  selector: 'app-new-order',
  templateUrl: './new-order.component.html',
  styleUrls: ['./new-order.component.css']
})
export class NewOrderComponent {

  // Output to app-root that order has been made
  @Output('orderHasMade') orderHasMade = new EventEmitter<void>();

  // Input table number and orderId from order-component
  @Input('tableNumber') tableNumber: number;
  @Input('orderObj') orderObj: object[];

  //create order form
  orderForm: FormGroup;
  NumberOfDiners: FormControl;

  constructor(private restaurantService: RestaurantService) {
    this.initFormControls();
    this.orderForm = new FormGroup({
      NumberOfDiners: this.NumberOfDiners,
    });
  }

  // Methods

  initFormControls(): void {
    this.NumberOfDiners = new FormControl('', [Validators.required, Validators.min(1), Validators.max(20)]);
  }

  orderTable(): void {
    let table: object = { // Create new table for Tables in Database
      "OrderId": this.orderObj[0],
      "TableNumber": this.tableNumber,
      "UserEmail": sessionStorage.getItem("UserEmail"),
      "NumberOfDiners": this.NumberOfDiners.value
    };
    this.restaurantService.addNewTable(table).subscribe(); // Add new table to Database
    this.orderHasMade.emit(); // Emit to app-root that order has made
    this.NumberOfDiners.setValue(''); // Clear the field
  }
}
