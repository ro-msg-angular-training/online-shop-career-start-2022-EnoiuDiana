import { Injectable } from '@angular/core';
import {Observable, of} from "rxjs";
import {HttpClient} from "@angular/common/http";
import {environment} from "../../environments/environment";
import {UserCredentials} from "../interfaces/UserCredentials";
import {User} from "../interfaces/User";

@Injectable({
  providedIn: 'root'
})

export class AuthService {

  isLoggedIn = false;

  constructor(private http: HttpClient) { }

// store the URL so we can redirect after logging in
  redirectUrl: string | null = null;

  login(userCredentials: UserCredentials) {
    return this.http.post<User>(environment.ROOT_URL + "/login", userCredentials)
  }

  changeLogInTrue(userLoggedIn: User) {
    this.isLoggedIn = true;
    localStorage.setItem("loggedInUsername", userLoggedIn.username)
    localStorage.setItem("loggedInPassword", userLoggedIn.password)
    localStorage.setItem("loggedInRoles", JSON.stringify(userLoggedIn.roles))
  }

  getLoggedInUsername() {
    return localStorage.getItem("loggedInUsername")
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
