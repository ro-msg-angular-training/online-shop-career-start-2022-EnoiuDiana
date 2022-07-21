import { Injectable } from '@angular/core';
import {Observable, of} from "rxjs";
import {HttpClient} from "@angular/common/http";

@Injectable({
  providedIn: 'root'
})

export class AuthService {

  isLoggedIn = false;
  readonly ROOT_URL = "http://localhost:3000"

  constructor(private http: HttpClient) { }

// store the URL so we can redirect after logging in
  redirectUrl: string | null = null;

  login(username: string, password: string) {
    let data = {
      username: username,
      password: password
    }
    return this.http.post(this.ROOT_URL + "/login", data)
  }

  changeLogInTrue(userLoggedIn: any) {
    this.isLoggedIn = true;

    localStorage.setItem("loggedInUsername", userLoggedIn.username)
    localStorage.setItem("loggedInPassword", userLoggedIn.password)
    localStorage.setItem("loggedInRoles", userLoggedIn.roles)
    console.log(localStorage.getItem("loggedInRoles"))
  }

  changeLogInFalse() {
    this.isLoggedIn = false;
  }

  getLoggInState() {
    return this.isLoggedIn
  }

  verifyAdmin() {
    if(this.isLoggedIn) {
      let roles = localStorage.getItem("loggedInRoles")
      return roles != null && roles.includes("admin");
    }
    return false;
  }

  verifyCustomer() {
    if(this.isLoggedIn) {
      let roles = localStorage.getItem("loggedInRoles")
      return roles != null && roles.includes("customer")
    }
    return false;
  }

  logout(): void {
    this.isLoggedIn = false;
  }
}
