import {Component, OnChanges, OnDestroy, OnInit, SimpleChanges} from '@angular/core';
import {FormControl, FormGroup, Validators} from "@angular/forms";
import { AuthService} from "../services/auth.service";
import {Router, Routes} from "@angular/router";
import { AppComponent} from "../app.component";
import {UserCredentials} from "../interfaces/UserCredentials";
import {AppState} from "../state/app.state";
import {Store} from "@ngrx/store";
import {login} from "../state/actions/login.actions";
import {NavigationBarComponent} from "../navigation-bar/navigation-bar.component";

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

  constructor(private router: Router,
              private store: Store<AppState>) { }

  ngOnInit(): void {
  }

  submitLogin() {
    const formValue = this.loginForm.value;
    const userCredentials : UserCredentials = {
      username: formValue.username,
      password: formValue.password
    }

    this.store.dispatch(login({userCredentials: userCredentials}))
  }

}
