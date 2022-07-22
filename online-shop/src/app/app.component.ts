import { Component , OnInit} from '@angular/core';
import {VERSION} from "@angular/compiler";
import {AuthService} from "./auth.service";


@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit{
  title = `online-shop ${VERSION.full}`;

  userIsCustomer = false;
  userIsAdmin = false;

  constructor(private auth: AuthService) {
  }

  ngOnInit(): void {
    this.userIsAdmin = this.auth.verifyAdmin()
    this.userIsCustomer = this.auth.verifyCustomer()
  }

  updateUserData() {
    this.userIsAdmin = this.auth.verifyAdmin()
    this.userIsCustomer = this.auth.verifyCustomer()
  }


}
