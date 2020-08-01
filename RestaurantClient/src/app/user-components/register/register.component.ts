import { Component, Input, Output, EventEmitter } from "@angular/core";
import { FormGroup, FormControl, Validators } from "@angular/forms";
import { UserService } from "../../Models/user.service";

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent {

  @Output('userRegister') userRegister = new EventEmitter<object>(); //Emit the new User
  @Input('users') users: object[]; //List of all Users

  // Variables 
  hideIsEmailExcistMessage: boolean = true;
  hideregErrorMessage: boolean = true;

  // Create Register form
  regForm: FormGroup;
  userEmail: FormControl;
  userPhoneNumber: FormControl;
  userName: FormControl;
  emailExp: RegExp = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;

  constructor(private UserService: UserService) {
    this.initFormControls();
    this.regForm = new FormGroup({
      userEmail: this.userEmail,
      userName: this.userName,
      userPhoneNumber: this.userPhoneNumber
    });
  }

  // Methods
  initFormControls(): void {
    this.userEmail = new FormControl('', [Validators.required, Validators.pattern(this.emailExp)]);
    this.userName = new FormControl('', [Validators.required, Validators.minLength(2)]);
    this.userPhoneNumber = new FormControl('', [Validators.required, Validators.minLength(8), Validators.maxLength(11)]);
  }

  isEmailExcist(): void {
    //Check if the Email is exist in Database = user is already registered
    for (let user of this.users) {
      if (user["UserEmail"] == this.userEmail.value) {
        this.hideIsEmailExcistMessage = false;
        return;
      }
    }
    this.hideIsEmailExcistMessage = true;
  }

  addUser(): void {
    let user: object; // object for new User

    //If there are errors in form
    if (this.userEmail.errors || this.userName.errors || this.userPhoneNumber.errors) {
      this.hideIsEmailExcistMessage = true;
      this.hideregErrorMessage = false;
      return;
    }
    //If email is already exist
    if (!this.hideIsEmailExcistMessage) {
      return;
    }
    else {
      user = { //Fill details in the new User
        "Name": this.userName.value,
        "UserEmail": this.userEmail.value,
        "PhoneNumber": "0" + this.userPhoneNumber.value
      };
      this.UserService.addNewUser(user).subscribe(); //Add new User to Database
    }
    this.userRegister.emit(user); // Emit to app-root the new User

    this.hideIsEmailExcistMessage = true;
    this.hideregErrorMessage = true;

    alert("registration has succeeded!") // Alert the user that registration has succeeded
  }
}
