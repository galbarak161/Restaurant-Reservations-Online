import { Injectable } from '@angular/core';
import { Http } from '@angular/http';
import { Observable } from 'rxjs/Observable';


@Injectable()
export class RestaurantService {

  constructor(private http: Http) { }

  // Get Methods 
  getRestaurantsJson(path: string): Observable<any> { // Get restaurant objects from Database
    return this.http.get("http://localhost:63321/api/Restaurants/" + path);
  }

  getOrderId(restaurantsId: number, orderDate: Date): Observable<any> { // Get order details by resId and orderDate
    return this.http.get("http://localhost:63321/api/Restaurant_Order/resId/"
      + restaurantsId
      + "/date/"
      + orderDate);
  }

  // Post Methods 
  addNewOrder(order: object): Observable<any> { // Post new Order
    return this.http.post("http://localhost:63321/api/Restaurant_Order", order);
  }

  addNewTable(table: object): Observable<any> { // Post new Table
    return this.http.post("http://localhost:63321/api/Tables", table);
  }


  // Delete Methods
  deleteOrder(orderId: number): Observable<any>{ // Delete Order
    return this.http.delete("http://localhost:63321/api/Tables/" + orderId);
  }
}
