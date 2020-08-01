import { Component, EventEmitter, Output } from '@angular/core';
import { FormGroup, FormControl, Validators } from "@angular/forms";
import { RestaurantService } from "../../Models/restaurant.service";

@Component({
  selector: 'app-restaurant',
  templateUrl: './restaurant.component.html',
  styleUrls: ['./restaurant.component.css']
})
export class RestaurantComponent {

  // Output the ResId and orderDate to the main Component
  @Output('ResAndDate') ResAndDate = new EventEmitter<object>();

  // Form
  restaurantForm: FormGroup;
  restaurantName: FormControl;
  orderDate: FormControl;

  // Variables
  isResValid: boolean = true;
  isDateValid: boolean = true;
  choosenRes: object;
  ResData: object[];
  today: string;
  resId: number;

  constructor(private restaurantService: RestaurantService) {
    this.initFormControls();
    this.restaurantForm = new FormGroup({
      restaurantName: this.restaurantName,
      orderDate: this.orderDate,
    });
    this.restaurantService.getRestaurantsJson("GetResList")
      .subscribe(res => this.ResData = res.json()); //Get the list of restaurants from Database
  }

  // Methods

  initFormControls(): void {
    this.restaurantName = new FormControl('', [Validators.required,]);
    this.orderDate = new FormControl('', [Validators.required]);
  }

  validationFunc(): boolean {
    // Check the validation of the user inputs

    if (this.restaurantName.value == "") // Check restaurant name
      this.isResValid = false;
    else {
      this.resId = this.ResData.indexOf(this.restaurantName.value) + 1; // Get restaurant Id
      if (this.resId > 0)
        this.isResValid = true;
      else
        this.isResValid = false;
    }

    // Check order date
    let date: number = Date.parse(this.orderDate.value);
    let today: number = new Date().getTime()
    if (isNaN(date) || date < today)
      this.isDateValid = false;
    else
      this.isDateValid = true;

    return (this.isDateValid && this.isResValid);
  }

  sendDetails(): void {
    // Emit the Restaurant object (id, date) to app-root
    if (this.validationFunc()) {
      let myRes = { "RestaurantId": this.resId, "OrderDate": this.orderDate.value };
      this.ResAndDate.emit(myRes);
    }
  }
}

