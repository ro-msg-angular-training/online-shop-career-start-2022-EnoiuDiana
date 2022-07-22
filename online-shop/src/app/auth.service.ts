import { Injectable } from '@angular/core';
import {Observable, of} from "rxjs";
import {HttpClient} from "@angular/common/http";
import {environment} from "../environments/environment";

@Injectable({
  providedIn: 'root'
})

export class AuthService {

  isLoggedIn = false;

  constructor(private http: HttpClient) { }

// store the URL so we can redirect after logging in
  redirectUrl: string | null = null;

  login(username: string, password: string) {
    const data = {
      username: username,
      password: password
    }
    return this.http.post(environment.ROOT_URL + "/login", data)
  }

  changeLogInTrue(userLoggedIn: any) {
    this.isLoggedIn = true;
    localStorage.setItem("loggedInUsername", userLoggedIn.username)
    localStorage.setItem("loggedInPassword", userLoggedIn.password)
    localStorage.setItem("loggedInRoles", userLoggedIn.roles)
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
