import { Component, OnInit } from '@angular/core';
import {FormControl, FormGroup, Validators} from "@angular/forms";
import { AuthService} from "../auth.service";
import {Router, Routes} from "@angular/router";
import { AppComponent} from "../app.component";

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {

  loginForm: FormGroup = new FormGroup({
    username: new FormControl(''),
    password: new FormControl(''),

  })

  loggedInSuccessful = false;
  loggInFail = false;

  constructor(private auth: AuthService, private router: Router, private navigation: AppComponent) { }

  ngOnInit(): void {
  }

  async submitLogin() {
    const formValue = this.loginForm.value;
    const login = await this.auth.login(formValue.username, formValue.password);
    login.subscribe(
      (val) => {
        console.log("POST call successful value returned in body",
          val);
        this.auth.changeLogInTrue(val)
        //update states
        this.loggedInSuccessful = true;
        this.loggInFail = false;

        //update buttons from navigation
        this.navigation.updateUserData()

        //redirect
        if(this.auth.redirectUrl != null) {
          this.router.navigate([this.auth.redirectUrl]).then();
        } else {
          this.router.navigate([""]).then();
        }
      },
      response => {
        console.log("POST call in error", response);
        this.auth.changeLogInFalse()
        //update states log in fail
        this.loggInFail = true;
        this.loggedInSuccessful = false;
      },
      () => {
        console.log("The POST observable is now completed.");
      }
    );
  }

}
