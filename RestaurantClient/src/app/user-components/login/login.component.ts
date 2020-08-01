import { Component, EventEmitter, Output, Input } from '@angular/core';
import { FormGroup, FormControl, Validators } from "@angular/forms";
import { UserService } from '../../Models/user.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent {

  @Output('userLogin') userLogin = new EventEmitter<void>(); //Emit login

  _users: object[]; // Input List of all Userse from app-root
  @Input()
  set users(users: object[]) {
    if (users) {
      this._users = users;
      this.userService.getUsersJson()
        .subscribe(res => this.users = res.json()); // Get Users list from Database 
    }}
  get users() { return this._users; }

  // Variables 
  hideInvalidErrorMessage: boolean = true;

  // Form
  loginForm: FormGroup;
  email: FormControl;
  phone: FormControl;
  emailExp: RegExp = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;

  constructor(private userService: UserService) {
    this.initFormControls();
    this.loginForm = new FormGroup({
      email: this.email,
      phone: this.phone,
    });
  }

  //Methods

  initFormControls(): void {
    this.email = new FormControl('', [Validators.required, Validators.pattern(this.emailExp)]);
    this.phone = new FormControl('', [Validators.required, Validators.minLength(9), Validators.maxLength(11)]);
  }

  login(): void {
    this.hideInvalidErrorMessage = true;
    for (let user of this.users) {
      // If the UserEmail & PhoneNumber fitting the data in User Table
      if (user["UserEmail"] == this.email.value && user["PhoneNumber"] == this.phone.value) {
        sessionStorage.setItem('UserEmail', this.email.value);
        sessionStorage.setItem('UserId', user["UserId"])
        sessionStorage.setItem('Name', user["Name"]);
        sessionStorage.setItem('PhoneNumber', this.phone.value);
        this.userLogin.emit(); // Emit to app-root that logging has been made
        break;
      }
      else {
        this.hideInvalidErrorMessage = false;
      }
    }
  }
}


