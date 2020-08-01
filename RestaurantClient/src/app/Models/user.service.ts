import { Injectable } from '@angular/core';
import { Http } from '@angular/http';
import { Observable } from 'rxjs/Observable';

@Injectable()
export class UserService {

  constructor(private http: Http) { }

  // Get Methods 
  getUsersJson(): Observable<any> { // Get all users list
    return this.http.get("http://localhost:63321/api/Users/all");
  }
  getUserOrders(id: string): Observable<any> { // Get all user orders list
    return this.http.get("http://localhost:63321/api/Users/id/" + id);
  }

  // Post Methods 
  addNewUser(user: object): Observable<any> { // Post new user
    return this.http.post("http://localhost:63321/api/Users", user);
  }
}
